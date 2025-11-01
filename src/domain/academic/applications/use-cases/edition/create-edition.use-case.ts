import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { EditionRepository } from '@root/domain/academic/applications/repositories/edition-repository'
import { Edition } from '@root/domain/academic/enterprise/entities/edition.entity'

import { Either, left, right } from '@core/logic/Either'

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
