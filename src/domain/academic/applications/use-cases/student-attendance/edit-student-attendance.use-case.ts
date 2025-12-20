import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { StudentAttendance } from '@root/domain/academic/enterprise/entities/student-attendance.entity'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'

import { Either, left, right } from '@core/logic/Either'

import { StudentAttendanceRepository } from '../../repositories/student-attendance.repository'

type InputProps = {
  markedByUserId: number
  enrollmentId: number
  month: number
  year: number
  isPresent: boolean
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditStudentAttendanceUseCase {
  constructor(
    private readonly studentAttendanceRepository: StudentAttendanceRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { enrollmentId, month, year, isPresent, markedByUserId } = data

    const markedBy = await this.userRepository.findById(markedByUserId)

    if (!markedBy) {
      return left(new ResourceNotFoundError())
    }

    const studentAttendance = await this.studentAttendanceRepository.findByEnrollmentMonthYear(
      enrollmentId,
      month,
      year,
    )

    if (!studentAttendance) {
      const newStudentAttendance = StudentAttendance.create({
        enrollmentId,
        month,
        year,
        isPresent,
        markedByUserId,
        markedAt: new Date(),
      })

      await this.studentAttendanceRepository.create(newStudentAttendance)
      return right(null)
    }

    studentAttendance.isPresent = isPresent
    studentAttendance.markedByUserId = markedByUserId
    studentAttendance.markedAt = new Date()

    await this.studentAttendanceRepository.save(studentAttendance)

    return right(null)
  }
}
