import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { EnrollmentRepository } from '../../repositories/enrollment.repository'
import { StudentRepository } from '../../repositories/student-repository'

type InputProps = {
  id: number
}

type OutputProps = Either<
  ResourceNotFoundError,
  {
    addressId?: number
  }
>

@Injectable()
export class DeleteStudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const student = await this.studentRepository.findById(id)
    if (!student) return left(new ResourceNotFoundError())

    await this.enrollmentRepository.deleteAllByStudentId(student.id)
    await this.studentRepository.delete(student.id)

    return right({ addressId: student.addressId })
  }
}
