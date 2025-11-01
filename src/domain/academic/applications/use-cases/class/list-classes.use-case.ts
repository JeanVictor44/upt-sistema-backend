import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { ClassWithDetailsDTO } from '../../dtos/class-with-details.dto'
import { ClassQueryRepository } from '../../repositories/class-query-repository'

type OutputProps = Either<null, ClassWithDetailsDTO[]>

@Injectable()
export class ListClassesUseCase {
  constructor(private readonly classQueryRepository: ClassQueryRepository) {}

  async execute(): Promise<OutputProps> {
    const classResult = await this.classQueryRepository.findAllWithDetails()

    return right(classResult)
  }
}
