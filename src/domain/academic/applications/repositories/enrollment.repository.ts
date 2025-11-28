import { AsyncMaybe } from '@root/core/logic/Maybe'
import { Enrollment } from '@root/domain/academic/enterprise/entities/enrollment.entity'

import { StudentEnrollment } from '../../enterprise/entities/student-enrollment.entity'

export interface FindByYearProps {
  year: number
  studentId: number
}

export abstract class EnrollmentRepository {
  abstract create(edition: Enrollment): Promise<void>
  abstract findById(id: number): Promise<Enrollment | null>
  abstract findByYear({ year, studentId }: FindByYearProps): AsyncMaybe<Enrollment>
  abstract save(edition: Enrollment): Promise<void>
  abstract delete(id: number): Promise<void>
  abstract findAllByStudentId(studentId: number): Promise<Enrollment[]>
  abstract deleteAllByStudentId(studentId: number): Promise<void>
  abstract findAllStudentEnrollmentsByClassEditionId(classEditionId: number): Promise<StudentEnrollment[]>
}
