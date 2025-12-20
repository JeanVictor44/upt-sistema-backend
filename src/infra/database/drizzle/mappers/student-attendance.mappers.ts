import { StudentAttendance } from '@root/domain/academic/enterprise/entities/student-attendance.entity'

import {
  StudentAttendanceschemaInsertProps,
  StudentAttendanceSchemaSelectProps,
} from '../schemas/student-attendance.schema'

export class StudentAttendanceMappers {
  static toDomain(data: StudentAttendanceSchemaSelectProps): StudentAttendance {
    return StudentAttendance.create(
      {
        enrollmentId: data.enrollmentId,
        isPresent: data.isPresent,
        markedAt: new Date(data.markedAt),
        markedByUserId: data.markedByUserId,
        month: data.month,
        year: data.year,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
      },
      data.id,
    )
  }

  static toPersistence(data: StudentAttendance): StudentAttendanceschemaInsertProps {
    return {
      id: data.id,
      enrollmentId: data.enrollmentId,
      isPresent: data.isPresent,
      markedAt: data.markedAt,
      markedByUserId: data.markedByUserId,
      month: data.month,
      year: data.year,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    }
  }
}
