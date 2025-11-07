import { Injectable } from '@nestjs/common'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { NotAllowedError } from '@core/errors/errors/not-allowed-error'
import { Either, left, right } from '@core/logic/Either'

import { UserRolesRepository } from '../repositories/user-role.repository'
import { UsersRepository } from '../repositories/users.repository'

type AuthorizationResult = Either<NotAllowedError | InactiveResourceError, true>

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userRolesRepository: UserRolesRepository,
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async isAuthorized(userActionId: number, allowedRoles: RolesEnum[]): Promise<AuthorizationResult> {
    const actor = await this.usersRepository.findById(userActionId)
    if (!actor) return left(new NotAllowedError())
    if (actor.disabledAt) return left(new InactiveResourceError())

    const userRole = await this.userRolesRepository.findActiveRoleByUserId(userActionId)
    if (!userRole) return left(new NotAllowedError())

    const role = await this.resourceRepository.findRoleById(userRole.roleId)
    if (!role) return left(new NotAllowedError())

    if (!allowedRoles.includes(role.name)) {
      return left(new NotAllowedError())
    }

    return right(true)
  }
}
