import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { NeighborhoodRepository } from '../repositories/neighborhood.repository'
import { TeachingPlaceRepository } from '../repositories/teaching-place.repository'

type InputProps = {
  name: string
  neighborhoodId: number
  id: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditTeachingPlaceUseCase {
  constructor(
    private readonly teachingPlaceRepository: TeachingPlaceRepository,
    private readonly neighborhoodRepository: NeighborhoodRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, neighborhoodId, id } = data

    const teachingPlace = await this.teachingPlaceRepository.findById(id)
    if (!teachingPlace) return left(new ResourceNotFoundError())

    const teachingPlaceExsists = await this.teachingPlaceRepository.findByNameAndNeighborhood({
      name,
      neighborhoodId,
    })

    const neighborhoodExsists = await this.neighborhoodRepository.findById(neighborhoodId)
    if (!neighborhoodExsists) return left(new ResourceNotFoundError())

    if (teachingPlaceExsists && neighborhoodExsists.id !== id) return left(new ResourceAlreadyExistsError())

    teachingPlace.name = name
    teachingPlace.neighborhoodId = neighborhoodId
    await this.teachingPlaceRepository.save(teachingPlace)

    return right(null)
  }
}
