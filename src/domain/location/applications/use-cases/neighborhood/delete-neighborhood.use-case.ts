import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { NeighborhoodRepository } from '../../repositories/neighborhood.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteNeighborhoodUseCase {
  constructor(private readonly neighborhoodRepository: NeighborhoodRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const neighborhood = await this.neighborhoodRepository.findById(id)
    if (!neighborhood) return left(new ResourceNotFoundError())

    await this.neighborhoodRepository.delete(neighborhood.id)

    return right(null)
  }
}
