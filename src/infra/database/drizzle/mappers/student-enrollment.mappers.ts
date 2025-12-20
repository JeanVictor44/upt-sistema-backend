import { StudentEnrollment } from '@root/domain/academic/enterprise/entities/student-enrollment.entity'
import { StudentEnrollmentProps } from '@root/domain/academic/enterprise/interfaces/student-enrollment'

export class StudentEnrollmentMappers {
  static toDomain(data: StudentEnrollmentProps): StudentEnrollment {
    return StudentEnrollment.create({
      studentId: data.studentId,
      enrollmentId: data.enrollmentId,
      name: data.name,
      socialName: data.socialName,
      cpf: data.cpf,
      telephone: data.telephone,
      enrollmentDate: data.enrollmentDate,
      enrollmentStatus: data.enrollmentStatus,
      isExempt: data.isExempt,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
      attendances: data.attendances,
    })
  }
}
