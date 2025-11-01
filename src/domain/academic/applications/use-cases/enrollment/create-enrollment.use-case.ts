import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { EditionRepository } from '@root/domain/academic/applications/repositories/edition-repository'
import { Enrollment } from '@root/domain/academic/enterprise/entities/enrollment.entity'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionRepository } from '../../repositories/class-edition-repository'
import { EnrollmentRepository } from '../../repositories/enrollment.repository'
import { StudentRepository } from '../../repositories/student-repository'

type InputProps = {
  studentId: number
  classEditionId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class CreateEnrollmentUseCase {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly classEditionRepository: ClassEditionRepository,
    private readonly editionRepository: EditionRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { classEditionId, studentId } = data

    const classEditionExists = await this.classEditionRepository.findById(classEditionId)
    if (!classEditionExists) return left(new ResourceNotFoundError())

    const studentExists = await this.studentRepository.findById(studentId)
    if (!studentExists) return left(new ResourceNotFoundError())

    const edition = await this.editionRepository.findById(classEditionExists.editionId)
    if (!edition) return left(new ResourceNotFoundError())

    const isEnrolledThisYear = await this.enrollmentRepository.findByYear({
      year: edition.year,
      studentId,
    })
    if (isEnrolledThisYear) return left(new ResourceAlreadyExistsError())

    const enrollment = Enrollment.create({
      studentId,
      classEditionId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      isExempt: false,
      statusId: 0,
    })

    await this.enrollmentRepository.create(enrollment)

    return right(null)
  }
}
