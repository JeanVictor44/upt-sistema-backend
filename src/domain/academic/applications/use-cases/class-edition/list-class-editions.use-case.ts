import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, right } from '@core/logic/Either'

import { ClassEditionWithDetailsDTO } from '../../dtos/class-edition-with-details.dto'
import { ClassEditionQueryRepository } from '../../repositories/class-edition-query-repository'

type OutputProps = Either<ResourceAlreadyExistsError, ClassEditionWithDetailsDTO[]>

@Injectable()
export class ListClassEditionsUseCase {
  constructor(private readonly classEditionRepository: ClassEditionQueryRepository) {}

  async execute(): Promise<OutputProps> {
    const classEditions = await this.classEditionRepository.findAllWithDetails()

    return right(classEditions)
  }
}
