import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { UserRoleDetailsDTO } from '../dtos/user-role-details.dto'
import { UserRolesRepository } from '../repositories/user-role.repository'

type OutputProps = Either<null, UserRoleDetailsDTO[]>

interface InputProps {
  regionId: number
}

@Injectable()
export class ListRegionManagersUseCase {
  constructor(private readonly userRoleRepository: UserRolesRepository) {}

  async execute({ regionId }: InputProps): Promise<OutputProps> {
    const regions = await this.userRoleRepository.findHistoryManagersByRegion(regionId)

    return right(regions)
  }
}
