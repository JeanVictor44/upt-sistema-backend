import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { EditionRepository } from '@root/domain/academic/applications/repositories/edition-repository'
import { Edition } from '@root/domain/academic/enterprise/entities/edition.entity'

import { Either, right } from '@core/logic/Either'

type OutputProps = Either<ResourceAlreadyExistsError, Edition[]>

@Injectable()
export class ListEditionsUseCase {
  constructor(private readonly editionRepository: EditionRepository) {}

  async execute(): Promise<OutputProps> {
    const editions = await this.editionRepository.findAll()

    return right(editions)
  }
}
