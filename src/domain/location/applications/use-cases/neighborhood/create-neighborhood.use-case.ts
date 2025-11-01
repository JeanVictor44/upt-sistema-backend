import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { Neighborhood } from '@domain/location/enterprise/entities/neighborhood.entity'

import { CityRepository } from '../../repositories/city.repository'
import { NeighborhoodRepository } from '../../repositories/neighborhood.repository'
import { RegionRepository } from '../../repositories/region.repository'

type InputProps = {
  name: string
  cityId: number
  regionId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class CreateNeighborhoodUseCase {
  constructor(
    private readonly neighborhoodRepository: NeighborhoodRepository,
    private readonly cityRepository: CityRepository,
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, cityId, regionId } = data

    const neighborhoodExists = await this.neighborhoodRepository.findByCompositeKeys({
      name,
      cityId,
      regionId,
    })
    if (neighborhoodExists) return left(new ResourceAlreadyExistsError())

    const cityExists = await this.cityRepository.findById(cityId)

    if (!cityExists) return left(new ResourceNotFoundError())

    const regionExists = await this.regionRepository.findById(regionId)

    if (!regionExists) return left(new ResourceNotFoundError())

    const neighborhood = Neighborhood.create({
      name,
      cityId,
      regionId,
    })

    await this.neighborhoodRepository.create(neighborhood)
    return right(null)
  }
}
