import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { EditionRepository } from '../../repositories/edition-repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteEditionUseCase {
  constructor(private readonly editionRepository: EditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const edition = await this.editionRepository.findById(id)
    if (!edition) return left(new ResourceNotFoundError())

    await this.editionRepository.delete(edition.id)

    return right(null)
  }
}
