import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { TeachingPlaceRepository } from '../../repositories/teaching-place.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteTeachingPlaceUseCase {
  constructor(private readonly teachingPlaceRepository: TeachingPlaceRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const teachingPlace = await this.teachingPlaceRepository.findById(id)
    if (!teachingPlace) return left(new ResourceNotFoundError())

    await this.teachingPlaceRepository.delete(teachingPlace.id)

    return right(null)
  }
}
