import { Inject, Injectable } from '@nestjs/common'
import { StudentAttendanceRepository } from '@root/domain/academic/applications/repositories/student-attendance.repository'
import { StudentAttendance } from '@root/domain/academic/enterprise/entities/student-attendance.entity'
import { and, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { StudentAttendanceMappers } from '../mappers/student-attendance.mappers'
import { studentAttendanceSchema } from '../schemas/student-attendance.schema'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleStudentAttendanceRepository implements StudentAttendanceRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(studentAttendance: StudentAttendance): Promise<void> {
    const preparedData = StudentAttendanceMappers.toPersistence(studentAttendance)

    await this.db.insert(studentAttendanceSchema).values(preparedData)
  }

  async save(studentAttendance: StudentAttendance): Promise<void> {
    const preparedData = StudentAttendanceMappers.toPersistence(studentAttendance)

    await this.db
      .update(studentAttendanceSchema)
      .set(preparedData)
      .where(eq(studentAttendanceSchema.id, studentAttendance.id))
  }

  async findByEnrollmentMonthYear(
    enrollmentId: number,
    month: number,
    year: number,
  ): Promise<StudentAttendance | null> {
    const studentAttendance = await this.db
      .select()
      .from(studentAttendanceSchema)
      .where(
        and(
          eq(studentAttendanceSchema.enrollmentId, enrollmentId),
          eq(studentAttendanceSchema.month, month),
          eq(studentAttendanceSchema.year, year),
        ),
      )
      .limit(1)

    if (!studentAttendance[0]) {
      return null
    }

    return StudentAttendanceMappers.toDomain(studentAttendance[0])
  }
}
