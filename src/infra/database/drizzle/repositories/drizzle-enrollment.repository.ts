import { Inject, Injectable } from '@nestjs/common'
import { AsyncMaybe } from '@root/core/logic/Maybe'
import {
  EnrollmentRepository,
  FindByYearProps,
} from '@root/domain/academic/applications/repositories/enrollment.repository'
import { Enrollment } from '@root/domain/academic/enterprise/entities/enrollment.entity'
import { StudentEnrollment } from '@root/domain/academic/enterprise/entities/student-enrollment.entity'
import { and, eq, getTableColumns } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { EnrollmentMappers } from '../mappers/enrollment.mappers'
import { StudentEnrollmentMappers } from '../mappers/student-enrollment.mappers'
import { classEditionSchema, editionSchema, enrollmentSchema, enrollmentStatusSchema, studentSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleEnrollmentRepository implements EnrollmentRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(enrollment: Enrollment): Promise<void> {
    const preparedData = EnrollmentMappers.toPersistence(enrollment)

    await this.db.insert(enrollmentSchema).values(preparedData)
  }

  async save(enrollment: Enrollment): Promise<void> {
    const preparedData = EnrollmentMappers.toPersistence(enrollment)

    await this.db.update(enrollmentSchema).set(preparedData).where(eq(enrollmentSchema.id, enrollment.id))
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(enrollmentSchema).where(eq(enrollmentSchema.id, id))
  }

  async findByYear({ studentId, year }: FindByYearProps): AsyncMaybe<Enrollment> {
    const enrollment = await this.db
      .select(getTableColumns(enrollmentSchema))
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(enrollmentSchema.classEditionId, classEditionSchema.id))
      .innerJoin(editionSchema, eq(classEditionSchema.id, editionSchema.id))
      .where(and(eq(enrollmentSchema.studentId, studentId), eq(editionSchema.year, year)))

    if (!enrollment[0]) return null

    const enrollmentFound = EnrollmentMappers.toDomain(enrollment[0])

    return enrollmentFound
  }

  async findById(id: number): Promise<Enrollment | null> {
    const enrollment = await this.db.query.enrollmentSchema.findFirst({
      where: eq(enrollmentSchema.id, id),
    })

    if (!enrollment) return null

    return EnrollmentMappers.toDomain(enrollment)
  }

  async findAllStudentEnrollmentsByClassEditionId(classEditionId: number): Promise<StudentEnrollment[]> {
    const enrollmentsStudent = await this.db
      .select({
        student: getTableColumns(studentSchema),
        enrollment: {
          id: enrollmentSchema.id,
          enrollmentStatusId: enrollmentSchema.statusId,
          enrollmentStatusName: enrollmentStatusSchema.name,
          enrollmentDate: enrollmentSchema.enrollmentDate,
          isExempt: enrollmentSchema.isExempt,
        },
      })
      .from(enrollmentSchema)
      .innerJoin(studentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .innerJoin(enrollmentStatusSchema, eq(enrollmentSchema.statusId, enrollmentStatusSchema.id))
      .where(eq(enrollmentSchema.classEditionId, classEditionId))

    return enrollmentsStudent.map((studentEnrollment) =>
      StudentEnrollmentMappers.toDomain({
        studentId: studentEnrollment.student.id,
        enrollmentId: studentEnrollment.enrollment.id,
        name: studentEnrollment.student.name,
        socialName: studentEnrollment.student.socialName || undefined,
        cpf: studentEnrollment.student.cpf,
        telephone: studentEnrollment.student.telephone || undefined,
        enrollmentDate: studentEnrollment.enrollment.enrollmentDate,
        enrollmentStatus: {
          id: studentEnrollment.enrollment.enrollmentStatusId,
          name: studentEnrollment.enrollment.enrollmentStatusName,
        },
        isExempt: studentEnrollment.enrollment.isExempt,
        createdAt: new Date(studentEnrollment.student.createdAt),
        updatedAt: studentEnrollment.student.updatedAt ? new Date(studentEnrollment.student.updatedAt) : undefined,
      }),
    )
  }
}
