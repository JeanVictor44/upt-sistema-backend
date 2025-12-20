import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'

import { StudentAttendance } from '../entities/student-attendance.entity'

export type StudentEnrollmentProps = {
  studentId: number
  enrollmentId: number
  name: string
  socialName?: string
  cpf: string
  telephone?: string
  enrollmentStatus: {
    id: number
    name: EnrollmentStatus
  }
  attendances: StudentAttendance[]
  enrollmentDate: string
  isExempt: boolean
  createdAt: Date
  updatedAt?: Date
}
