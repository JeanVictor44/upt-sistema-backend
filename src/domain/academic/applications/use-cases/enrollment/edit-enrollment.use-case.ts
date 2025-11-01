import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { EnrollmentRepository } from '../../repositories/enrollment.repository'

type InputProps = {
  enrollmentId: number
  isExempt: boolean
  statusId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditEnrollmentUseCase {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { enrollmentId, isExempt, statusId } = data

    const enrollment = await this.enrollmentRepository.findById(enrollmentId)

    if (!enrollment) return left(new ResourceNotFoundError())

    enrollment.isExempt = isExempt
    enrollment.statusId = statusId

    await this.enrollmentRepository.save(enrollment)

    return right(null)
  }
}
