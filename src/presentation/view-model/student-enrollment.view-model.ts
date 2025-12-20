import type { StudentEnrollmentProps } from '@root/domain/academic/enterprise/interfaces/student-enrollment'

export class StudentEnrollmentViewModel {
  static toHttp(studentEnrollment: StudentEnrollmentProps) {
    return {
      studentId: studentEnrollment.studentId,
      enrollmentId: studentEnrollment.enrollmentId,
      name: studentEnrollment.name,
      socialName: studentEnrollment.socialName,
      cpf: studentEnrollment.cpf,
      telephone: studentEnrollment.telephone,
      enrollmentStatus: {
        id: studentEnrollment.enrollmentStatus.id,
        name: studentEnrollment.enrollmentStatus.name,
      },
      attendances: studentEnrollment.attendances.map((attendance) => ({
        id: attendance.id,
        month: attendance.month,
        year: attendance.year,
        isPresent: attendance.isPresent,
      })),
      enrollmentDate: studentEnrollment.enrollmentDate,
      isExempt: studentEnrollment.isExempt,
      createdAt: studentEnrollment.createdAt,
      updatedAt: studentEnrollment.updatedAt,
    }
  }
}
