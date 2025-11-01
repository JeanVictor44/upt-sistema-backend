import { Injectable } from '@nestjs/common'
import { ResourceConflictError } from '@root/core/errors/errors/resource-conflict-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { NeighborhoodRepository } from '../../repositories/neighborhood.repository'
import { RegionRepository } from '../../repositories/region.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError | ResourceConflictError, null>

@Injectable()
export class DeleteRegionUseCase {
  constructor(
    private readonly regionRepository: RegionRepository,
    private readonly neighborhoodRepository: NeighborhoodRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const region = await this.regionRepository.findById(id)
    if (!region) return left(new ResourceNotFoundError())

    const neighborhoods = await this.neighborhoodRepository.findByRegionId(region.id)

    if (neighborhoods.length > 0) {
      return left(new ResourceConflictError())
    }

    await this.regionRepository.delete(region.id)

    return right(null)
  }
}
