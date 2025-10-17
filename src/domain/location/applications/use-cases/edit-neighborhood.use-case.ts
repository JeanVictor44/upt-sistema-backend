import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { NeighborhoodRepository } from '../repositories/neighborhood.repository'

type InputProps = {
  id: number
  name: string
  cityId: number
  regionId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditNeighborhoodUseCase {
  constructor(private readonly neighborhoodRepository: NeighborhoodRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, id, cityId, regionId } = data

    const neighborhood = await this.neighborhoodRepository.findById(id)
    if (!neighborhood) return left(new ResourceNotFoundError())

    const neighborhoodAlreadyExists = await this.neighborhoodRepository.findByCompositeKeys({
      cityId,
      name,
      regionId,
    })
    if (neighborhoodAlreadyExists && neighborhoodAlreadyExists.id !== neighborhood.id)
      return left(new ResourceAlreadyExistsError())

    neighborhood.name = name
    neighborhood.cityId = cityId
    neighborhood.regionId = regionId

    await this.neighborhoodRepository.save(neighborhood)

    return right(null)
  }
}
