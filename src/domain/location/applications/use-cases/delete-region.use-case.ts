import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { RegionRepository } from '../repositories/region.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteRegionUseCase {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const region = await this.regionRepository.findById(id)
    if (!region) return left(new ResourceNotFoundError())

    await this.regionRepository.delete(region.id)

    return right(null)
  }
}
