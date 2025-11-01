import { Enrollment } from '@root/domain/academic/enterprise/entities/enrollment.entity'

import { EnrollmentSchemaSchemaInsertProps, EnrollmentSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class EnrollmentMappers {
  static toDomain(data: EnrollmentSchemaSelectProps): Enrollment {
    return Enrollment.create(
      {
        classEditionId: data.classEditionId,
        studentId: data.studentId,
        enrollmentDate: data.enrollmentDate,
        isExempt: data.isExempt,
        statusId: data.statusId,
      },
      data.id,
    )
  }

  static toPersistence(data: Enrollment): EnrollmentSchemaSchemaInsertProps {
    return {
      id: data.id,
      enrollmentDate: data.enrollmentDate,
      classEditionId: data.classEditionId,
      studentId: data.studentId,
      isExempt: data.isExempt,
      statusId: data.statusId,
    }
  }
}
