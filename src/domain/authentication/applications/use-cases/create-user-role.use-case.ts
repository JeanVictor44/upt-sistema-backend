import { Injectable } from '@nestjs/common'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceAlreadyExistsError } from '@core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@core/logic/Either'

import { UserRole } from '../../enterprise/entities/user-role.entity'
import { UserRolesRepository } from '../repositories/user-role.repository'
import { UsersRepository } from '../repositories/users.repository'
import { AuthorizationService } from '../services/authorization-service'

type InputProps = {
  userActionId: number
  userId: number
  roleId: number
  teachingPlaceId?: number
  regionId?: number
}

type OutputProps = Either<ResourceNotFoundError | ResourceAlreadyExistsError | InactiveResourceError, null>

@Injectable()
export class CreateUserRoleUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userRolesRepository: UserRolesRepository,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { userActionId, userId, roleId, teachingPlaceId, regionId } = data

    const authorizedResult = await this.authorizationService.isAuthorized(userActionId, [RolesEnum.ADMIN])
    if (authorizedResult.isLeft()) return left(authorizedResult.value)

    const userToUpdate = await this.usersRepository.findById(userId)
    if (!userToUpdate) return left(new ResourceNotFoundError())
    if (userToUpdate.disabledAt) return left(new InactiveResourceError())

    const userAlreadyHasRole = await this.userRolesRepository.findActiveRoleByUserId(userId)
    if (userAlreadyHasRole) return left(new ResourceAlreadyExistsError())

    const userRole = UserRole.create({
      userId,
      roleId,
      teachingPlaceId,
      regionId,
      startDate: new Date(),
      endDate: null,
    })

    await this.userRolesRepository.create(userRole)
    return right(null)
  }
}
