import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, left, right } from '@core/logic/Either'

import { EditionRepository } from '@domain/edition/applications/repositories/edition-repository'
import { Edition } from '@domain/edition/enterprise/entities/edition.entity'

type InputProps = {
  year: number
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateEditionUseCase {
  constructor(private readonly editionRepository: EditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { year } = data

    const editionExists = await this.editionRepository.findByYear(year)
    if (editionExists) return left(new ResourceAlreadyExistsError())

    const edition = Edition.create({
      year,
    })
    await this.editionRepository.create(edition)

    return right(null)
  }
}
