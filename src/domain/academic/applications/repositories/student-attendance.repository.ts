import { StudentAttendance } from '../../enterprise/entities/student-attendance.entity'

export abstract class StudentAttendanceRepository {
  abstract create(studentAttendance: StudentAttendance): Promise<void>
  abstract save(studentAttendance: StudentAttendance): Promise<void>
  abstract findByEnrollmentMonthYear(
    enrollmentId: number,
    month: number,
    year: number,
  ): Promise<StudentAttendance | null>
}
