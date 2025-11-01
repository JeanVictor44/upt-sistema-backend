import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { StudentEnrollment } from '@root/domain/academic/enterprise/entities/student-enrollment.entity'

import { Either, right } from '@core/logic/Either'

import { EnrollmentRepository } from '../../repositories/enrollment.repository'

type InputProps = {
  classEditionId: number
}

type OutputProps = Either<ResourceAlreadyExistsError, StudentEnrollment[]>

@Injectable()
export class ListStudentsEnrollmentClassEditionUseCase {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { classEditionId } = data
    const studentsEnrollment = await this.enrollmentRepository.findAllStudentEnrollmentsByClassEditionId(classEditionId)

    return right(studentsEnrollment)
  }
}
