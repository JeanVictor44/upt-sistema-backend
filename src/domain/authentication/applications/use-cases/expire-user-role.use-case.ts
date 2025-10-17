import { Injectable } from '@nestjs/common'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceAlreadyExistsError } from '@core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@core/logic/Either'

import { UserRolesRepository } from '../repositories/user-role.repository'
import { UsersRepository } from '../repositories/users.repository'
import { AuthorizationService } from '../services/authorization-service'

type InputProps = {
  userActionId: number
  userId: number
}

type OutputProps = Either<ResourceNotFoundError | ResourceAlreadyExistsError | InactiveResourceError, null>

@Injectable()
export class ExpireUserRoleUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authorizationService: AuthorizationService,
    private readonly userRolesRepository: UserRolesRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { userId, userActionId } = data
    // Considerando QUE O USUÁRIO SÓ POSSA TER UMA ROLE ATIVA

    const authorizedResult = await this.authorizationService.isAuthorized(userActionId, [RolesEnum.ADMIN])
    if (authorizedResult.isLeft()) return left(authorizedResult.value)

    const userToUpdate = await this.usersRepository.findById(userId)
    if (!userToUpdate) return left(new ResourceNotFoundError())

    const userRoleActive = await this.userRolesRepository.findActiveRoleByUserId(userId)
    if (!userRoleActive) return left(new ResourceNotFoundError())

    userRoleActive.expireUserRole()
    await this.userRolesRepository.save(userRoleActive)
    return right(null)
  }
}
