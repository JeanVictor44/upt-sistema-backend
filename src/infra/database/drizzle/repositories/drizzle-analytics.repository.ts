import { Inject, Injectable } from '@nestjs/common'
import { BigNumbersDto } from '@root/domain/analytics/applications/dtos/big-numbers.dto'
import { DistributionByEthnicitytDTO } from '@root/domain/analytics/applications/dtos/distribution-by-ethnicity.dto'
import { DistributionByGenderIdentitytDTO } from '@root/domain/analytics/applications/dtos/distribution-by-gender-identity.dto'
import { DistributionByPropertyLocationtDTO } from '@root/domain/analytics/applications/dtos/distribution-by-property-location.dto'
import { DistributionByShiftDTO } from '@root/domain/analytics/applications/dtos/distribution-by-shift.dto'
import { EnrollemntEvolutionDTO } from '@root/domain/analytics/applications/dtos/enrollment-evolution.dto'
import { TopClassEditionEnrollmentDTO } from '@root/domain/analytics/applications/dtos/top-class-edition.dto'
import {
  AnalyticsQueryRepository,
  FindDataProps,
} from '@root/domain/analytics/applications/repositories/analytics-repository-query'
import { and, countDistinct, desc, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import {
  addressSchema,
  classEditionSchema,
  classSchema,
  editionSchema,
  enrollmentSchema,
  enrollmentStatuses,
  ethnicitySchema,
  genderIdentitySchema,
  propertyLocationCategorySchema,
  shiftSchema,
  studentSchema,
} from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleAnalyticsQueryRepository implements AnalyticsQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}
  async findBigNumbers(data: FindDataProps): Promise<BigNumbersDto> {
    const totalStudents = await this.db
      .selectDistinct({ count: countDistinct(studentSchema.id) })
      .from(studentSchema)
      .leftJoin(enrollmentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .leftJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)

    const enrolledStudents = await this.db
      .select({ count: countDistinct(enrollmentSchema.studentId) })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)

    const statusApprovedId = enrollmentStatuses.enumValues.findIndex((status) => status === 'APROVADO') + 1
    const statusDropedOutId = enrollmentStatuses.enumValues.findIndex((status) => status === 'EVADIDO') + 1

    const studentsApproved = await this.db
      .select({ count: countDistinct(enrollmentSchema.studentId) })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(
        and(
          data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined,
          eq(enrollmentSchema.statusId, statusApprovedId),
        ),
      )

    const studentsDropedOut = await this.db
      .select({ count: countDistinct(enrollmentSchema.studentId) })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(
        and(
          data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined,
          eq(enrollmentSchema.statusId, statusDropedOutId),
        ),
      )

    return {
      totalStudents: totalStudents[0].count,
      enrolledStudents: enrolledStudents[0].count,
      studentsApproved: studentsApproved[0].count,
      studentsDropedOut: studentsDropedOut[0].count,
    }
  }
  async distributionByShift(data: FindDataProps): Promise<DistributionByShiftDTO[]> {
    const results = await this.db
      .select({
        shiftId: shiftSchema.id,
        shiftName: shiftSchema.name,
        studentCount: countDistinct(enrollmentSchema.studentId),
      })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .innerJoin(shiftSchema, eq(shiftSchema.id, classEditionSchema.shiftId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .groupBy(shiftSchema.id, shiftSchema.name)

    return results.map((result) => ({
      shift: result.shiftName,
      studentCount: result.studentCount,
    }))
  }

  async distributionByEthnicity(data: FindDataProps): Promise<DistributionByEthnicitytDTO[]> {
    const results = await this.db
      .select({
        ethnicity: ethnicitySchema.name,
        ethnicityCount: countDistinct(studentSchema.id),
      })
      .from(studentSchema)
      .innerJoin(enrollmentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .innerJoin(ethnicitySchema, eq(studentSchema.ethnicityId, ethnicitySchema.id))
      .groupBy(ethnicitySchema.name)

    return results.map((result) => ({
      count: result.ethnicityCount,
      ethnicity: result.ethnicity,
    }))
  }

  async distributionByGenderIdentity(data: FindDataProps): Promise<DistributionByGenderIdentitytDTO[]> {
    const results = await this.db
      .select({
        genderIdentity: genderIdentitySchema.name,
        count: countDistinct(studentSchema.genderIdentityId),
      })
      .from(studentSchema)
      .innerJoin(enrollmentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .innerJoin(genderIdentitySchema, eq(studentSchema.genderIdentityId, genderIdentitySchema.id))
      .groupBy(genderIdentitySchema.name)

    return results.map((result) => ({
      genderIdentity: result.genderIdentity,
      count: result.count,
    }))
  }

  async distributionByPropertyLocation(data: FindDataProps): Promise<DistributionByPropertyLocationtDTO[]> {
    const results = await this.db
      .select({
        propertyLocation: propertyLocationCategorySchema.name,
        count: countDistinct(studentSchema.id),
      })
      .from(studentSchema)
      .innerJoin(addressSchema, eq(addressSchema.id, studentSchema.addressId))
      .innerJoin(enrollmentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .innerJoin(
        propertyLocationCategorySchema,
        eq(addressSchema.propertyLocationCategoryId, propertyLocationCategorySchema.id),
      )
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .groupBy(propertyLocationCategorySchema.name)

    return results.map((result) => ({
      propertyLocation: result.propertyLocation,
      count: result.count,
    }))
  }

  async topClassEditionsEnrollment(data: FindDataProps): Promise<TopClassEditionEnrollmentDTO[]> {
    const results = await this.db
      .select({
        className: classSchema.name,
        year: editionSchema.year,
        enrolledCount: countDistinct(enrollmentSchema.studentId),
      })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .innerJoin(classSchema, eq(classSchema.id, classEditionSchema.classId))
      .innerJoin(editionSchema, eq(editionSchema.id, classEditionSchema.editionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .groupBy(classEditionSchema.id, classSchema.name, editionSchema.year)
      .orderBy(desc(countDistinct(enrollmentSchema.studentId)))
      .limit(5)

    return results.map((result) => ({
      name: `${result.className} - ${result.year}`,
      value: result.enrolledCount,
    }))
  }

  async enrollmentEvolution(data: FindDataProps): Promise<EnrollemntEvolutionDTO[]> {
    const results = await this.db
      .select({
        year: editionSchema.year,
        month: enrollmentSchema.enrollmentDate,
        enrolledCount: countDistinct(enrollmentSchema.studentId),
      })
      .from(enrollmentSchema)
      .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
      .innerJoin(editionSchema, eq(editionSchema.id, classEditionSchema.editionId))
      .where(data.editionId ? eq(classEditionSchema.editionId, data.editionId) : undefined)
      .groupBy(editionSchema.year, enrollmentSchema.enrollmentDate)
      .orderBy(editionSchema.year, enrollmentSchema.enrollmentDate)

    return results.map((result) => ({
      period: `${result.year}.${new Date(result.month).getMonth() + 1}`,
      count: result.enrolledCount,
    }))
  }
}
