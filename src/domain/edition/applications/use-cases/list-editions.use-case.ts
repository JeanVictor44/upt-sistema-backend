import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, right } from '@core/logic/Either'

import { EditionRepository } from '@domain/edition/applications/repositories/edition-repository'
import { Edition } from '@domain/edition/enterprise/entities/edition.entity'

type OutputProps = Either<ResourceAlreadyExistsError, Edition[]>

@Injectable()
export class ListEditionsUseCase {
  constructor(private readonly editionRepository: EditionRepository) {}

  async execute(): Promise<OutputProps> {
    const editions = await this.editionRepository.findAll()

    return right(editions)
  }
}
