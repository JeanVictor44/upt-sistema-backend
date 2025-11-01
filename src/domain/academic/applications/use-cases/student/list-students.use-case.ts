import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, right } from '@core/logic/Either'

import { StudentWithDetailsDTO } from '../../dtos/student-with-details.dto'
import { StudentQueryRepository } from '../../repositories/student-query-repository'

type OutputProps = Either<ResourceAlreadyExistsError, StudentWithDetailsDTO[]>

@Injectable()
export class ListStudentsUseCase {
  constructor(private readonly studentQueryRepository: StudentQueryRepository) {}

  async execute(): Promise<OutputProps> {
    const students = await this.studentQueryRepository.findAllWithDetails()

    return right(students)
  }
}
