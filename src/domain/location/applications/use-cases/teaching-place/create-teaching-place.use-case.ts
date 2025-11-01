import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { TeachingPlace } from '@domain/location/enterprise/entities/teaching-place.entity'

import { NeighborhoodRepository } from '../../repositories/neighborhood.repository'
import { TeachingPlaceRepository } from '../../repositories/teaching-place.repository'

type InputProps = {
  name: string
  neighborhoodId: number
  propertyLocationCategoryId: number
  traditionalCommunityName?: string
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class CreateTeachingPlaceUseCase {
  constructor(
    private readonly teachingPlaceRepository: TeachingPlaceRepository,
    private readonly neighborhoodRepository: NeighborhoodRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, neighborhoodId } = data

    const teachingPlaceExists = await this.teachingPlaceRepository.findByNameAndNeighborhood({
      name,
      neighborhoodId,
    })
    if (teachingPlaceExists) return left(new ResourceAlreadyExistsError())

    const neighborhoodExists = await this.neighborhoodRepository.findById(neighborhoodId)
    if (!neighborhoodExists) return left(new ResourceNotFoundError())

    const teachingPlace = TeachingPlace.create({
      name,
      neighborhoodId,
      propertyLocationCategoryId: data.propertyLocationCategoryId,
      traditionalCommunityName: data.traditionalCommunityName,
    })
    await this.teachingPlaceRepository.create(teachingPlace)

    return right(null)
  }
}
