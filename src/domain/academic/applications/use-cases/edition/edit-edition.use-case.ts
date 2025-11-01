import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { EditionRepository } from '../../repositories/edition-repository'

type InputProps = {
  id: number
  year: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditEditionUseCase {
  constructor(private readonly editionRepository: EditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { year, id } = data

    const edition = await this.editionRepository.findById(id)
    if (!edition) return left(new ResourceNotFoundError())

    const editionAlreadyExists = await this.editionRepository.findByYear(year)
    if (editionAlreadyExists && editionAlreadyExists.id !== edition.id) return left(new ResourceAlreadyExistsError())

    edition.year = year
    await this.editionRepository.save(edition)

    return right(null)
  }
}
