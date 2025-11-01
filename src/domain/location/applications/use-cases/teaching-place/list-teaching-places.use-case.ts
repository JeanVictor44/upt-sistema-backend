import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { TeachingPlaceWithDetailsDTO } from '../../dtos/teaching-place-with-details.dto'
import { TeachingPlaceQueryRepository } from '../../repositories/teaching-place-query.repository'

type OutputProps = Either<null, TeachingPlaceWithDetailsDTO[]>

@Injectable()
export class ListTeachingPlacesUseCase {
  constructor(private readonly teachingPlaceQueryRepository: TeachingPlaceQueryRepository) {}

  async execute(): Promise<OutputProps> {
    const teachingPlaces = await this.teachingPlaceQueryRepository.findAllWithDetails()

    return right(teachingPlaces)
  }
}
