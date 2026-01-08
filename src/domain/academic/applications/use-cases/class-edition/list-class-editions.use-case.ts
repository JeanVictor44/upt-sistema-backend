import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { UserRolesRepository } from '@root/domain/authentication/applications/repositories/user-role.repository'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'
import { convertRoleIdToName } from '@root/utils/convert-role-id-to-name'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionWithDetailsDTO } from '../../dtos/class-edition-with-details.dto'
import { ClassEditionQueryRepository } from '../../repositories/class-edition-query-repository'

type InputProps = {
  userId: number
}
type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, ClassEditionWithDetailsDTO[]>

@Injectable()
export class ListClassEditionsUseCase {
  constructor(
    private readonly classEditionRepository: ClassEditionQueryRepository,
    private readonly usersRepository: UsersRepository,
    private readonly userRolesRepository: UserRolesRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const user = await this.usersRepository.findById(data.userId)
    if (!user) return left(new ResourceNotFoundError())

    const userRole = await this.userRolesRepository.findActiveRoleByUserId(data.userId)
    if (!userRole) return left(new ResourceNotFoundError())

    const role = convertRoleIdToName(userRole.roleId)

    const isAdmin = role === 'ADMIN'
    if (isAdmin) {
      const classEditions = await this.classEditionRepository.findAllWithDetails()
      return right(classEditions)
    }

    const isInteriorManager = role === 'INTERIOR_MANAGER'
    if (isInteriorManager) {
      const classEditions = await this.classEditionRepository.findAllWithDetails({
        regionId: userRole.regionId,
      })
      return right(classEditions)
    }

    const isSecretary = role === 'SECRETARY'
    const isCapitalManager = role === 'CAPITAL_MANAGER'
    if (isSecretary || isCapitalManager) {
      const classEditions = await this.classEditionRepository.findAllWithDetails({
        teachingPlacesIds: [userRole.teachingPlaceId!],
      })
      return right(classEditions)
    }

    return right([])
  }
}
