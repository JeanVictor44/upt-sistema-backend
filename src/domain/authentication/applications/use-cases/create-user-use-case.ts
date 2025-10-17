import { Injectable } from '@nestjs/common'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceAlreadyExistsError } from '@core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@core/logic/Either'

import { User } from '../../enterprise/entities/user.entity'
import { UsersRepository } from '../repositories/users.repository'
import { AuthorizationService } from '../services/authorization-service'

type InputProps = {
  userActionId: number
  name: string
  email: string
  telephone: string
  password: string
  document: string
}

type OutputProps = Either<ResourceNotFoundError | ResourceAlreadyExistsError | InactiveResourceError, User>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, email, telephone, document, password, userActionId } = data

    const authorizedResult = await this.authorizationService.isAuthorized(userActionId, [RolesEnum.ADMIN])
    if (authorizedResult.isLeft()) return left(authorizedResult.value)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) return left(new ResourceAlreadyExistsError())

    const documentAlreadyExists = await this.usersRepository.findByDocument(document)
    if (documentAlreadyExists) return left(new ResourceAlreadyExistsError())

    const newUser = User.create({
      name,
      email,
      telephone,
      document,
      password,
    })

    const userEntity = await this.usersRepository.create(newUser)

    return right(userEntity)
  }
}
