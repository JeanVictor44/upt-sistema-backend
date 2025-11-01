import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { NeighborhoodWithDetailsDTO } from '../../dtos/neighborhood-with-details.dto'
import { NeighborhoodQueryRepository } from '../../repositories/neighborhood-query.repository'

type OutputProps = Either<null, NeighborhoodWithDetailsDTO[]>

@Injectable()
export class ListNeighborhoodUseCase {
  constructor(private readonly neighborhoodQueryRepository: NeighborhoodQueryRepository) {}

  async execute(): Promise<OutputProps> {
    const neighborhoods = await this.neighborhoodQueryRepository.findAllWithDetails()

    return right(neighborhoods)
  }
}
