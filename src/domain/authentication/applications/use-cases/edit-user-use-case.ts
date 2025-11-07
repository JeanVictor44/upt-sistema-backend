import { Injectable } from '@nestjs/common'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceAlreadyExistsError } from '@core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@core/logic/Either'

import { User } from '../../enterprise/entities/user.entity'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users.repository'
import { AuthorizationService } from '../services/authorization-service'

type InputProps = {
  userActionId: number
  id: number
  name: string
  email: string
  telephone: string
  password: string
  document: string
}

type OutputProps = Either<ResourceNotFoundError | ResourceAlreadyExistsError | InactiveResourceError, User>

@Injectable()
export class EditUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, email, telephone, document, password, userActionId, id } = data

    const authorizedResult = await this.authorizationService.isAuthorized(userActionId, [RolesEnum.ADMIN])
    if (authorizedResult.isLeft()) return left(authorizedResult.value)

    const user = await this.usersRepository.findById(id)
    if (!user) return left(new ResourceNotFoundError())

    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists && userAlreadyExists.id != id) return left(new ResourceAlreadyExistsError())

    const documentAlreadyExists = await this.usersRepository.findByDocument(document)
    if (documentAlreadyExists) return left(new ResourceAlreadyExistsError())

    user.name = name
    user.email = email
    user.telephone = telephone
    user.document = document
    user.password = password ? await this.hashGenerator.hash(password) : user.password

    const userEntity = await this.usersRepository.save(user)

    return right(userEntity)
  }
}
