import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'

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
  enrollmentDate: string
  isExempt: boolean
  createdAt: Date
  updatedAt?: Date
}
