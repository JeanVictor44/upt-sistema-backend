import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { UserRolesRepository } from '@root/domain/authentication/applications/repositories/user-role.repository'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'

import { Either, left, right } from '@core/logic/Either'

import { StudentWithDetailsDTO } from '../../dtos/student-with-details.dto'
import { StudentQueryRepository } from '../../repositories/student-query-repository'

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, StudentWithDetailsDTO[]>

type InputProps = {
  userId: number
}
@Injectable()
export class ListStudentsUseCase {
  constructor(
    private readonly studentQueryRepository: StudentQueryRepository,
    private readonly userRepository: UsersRepository,
    private readonly userRoleRepository: UserRolesRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { userId } = data

    const user = await this.userRepository.findById(userId)
    if (!user) return left(new ResourceNotFoundError())

    const userRole = await this.userRoleRepository.findActiveRoleByUserId(userId)
    if (!userRole) return left(new ResourceNotFoundError())

    const regionId: number | undefined = userRole.regionId ? userRole.regionId : undefined
    const classEditionId: number | undefined = userRole.classEditionId ? userRole.classEditionId : undefined

    const students = await this.studentQueryRepository.findAllWithDetails({
      regionId,
      classEditionId,
    })

    return right(students)
  }
}
