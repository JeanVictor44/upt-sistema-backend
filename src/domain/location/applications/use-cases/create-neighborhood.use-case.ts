import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, left, right } from '@core/logic/Either'

import { Neighborhood } from '@domain/location/enterprise/entities/neighborhood.entity'

import { NeighborhoodRepository } from '../repositories/neighborhood.repository'

type InputProps = {
  name: string
  cityId: number
  regionId: number
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateNeighborhoodUseCase {
  constructor(private readonly neighborhoodRepository: NeighborhoodRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, cityId, regionId } = data

    const neighborhoodExists = await this.neighborhoodRepository.findByCompositeKeys({
      name,
      cityId: cityId,
      regionId: regionId,
    })
    if (neighborhoodExists) return left(new ResourceAlreadyExistsError())

    const neighborhood = Neighborhood.create({
      name,
      cityId: cityId,
      regionId: regionId,
    })

    await this.neighborhoodRepository.create(neighborhood)
    return right(null)
  }
}
