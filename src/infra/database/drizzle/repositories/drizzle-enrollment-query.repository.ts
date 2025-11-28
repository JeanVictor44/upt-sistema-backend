import { Inject, Injectable } from '@nestjs/common'
import { EnrollmentReportDTO } from '@root/domain/academic/applications/dtos/enrollment-report.dto'
import { EnrollmentQueryRepository } from '@root/domain/academic/applications/repositories/enrollment-query-repository'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import {
  addressSchema,
  citySchema,
  classEditionSchema,
  classSchema,
  enrollmentSchema,
  enrollmentStatusSchema,
  ethnicitySchema,
  genderIdentitySchema,
  highSchoolStatusSchema,
  neighborhoodSchema,
  propertyLocationCategorySchema,
  regionSchema,
  studentSchema,
  teachingPlaceSchema,
  classOptionSchema,
} from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleEnrollmentQueryRepository implements EnrollmentQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findEnrollmentsByRegion(regionId: number): Promise<EnrollmentReportDTO[]> {
    const enrollments = await this.db
      .select({
        regionName: regionSchema.name,
        cityName: citySchema.name,
        teachingPlaceName: teachingPlaceSchema.name,
        teachingPlacePropertyLocationCategoryId: teachingPlaceSchema.propertyLocationCategoryId,
        teachingPlaceTraditionalCommunityName: teachingPlaceSchema.traditionalCommunityName,
        studentName: studentSchema.name,
        socialName: studentSchema.socialName,
        cpf: studentSchema.cpf,
        rg: studentSchema.rg,
        dateBirth: studentSchema.dateBirth,
        telephone: studentSchema.telephone,
        email: studentSchema.email,
        genderIdentityId: studentSchema.genderIdentityId,
        ethnicityId: studentSchema.ethnicityId,
        addressStreet: addressSchema.street,
        addressNumber: addressSchema.number,
        addressNeighborhood: addressSchema.neighboorhood,
        zipCode: addressSchema.zipCode,
        addressCity: addressSchema.city,
        addressPropertyLocationCategoryId: addressSchema.propertyLocationCategoryId,
        addressTraditionalCommunityName: addressSchema.traditionalCommunityName,
        highSchoolStatusId: studentSchema.highSchoolStatusId,
        classOptionId: classEditionSchema.optionId,
        enrollmentDate: enrollmentSchema.enrollmentDate,
        enrollmentStatusId: enrollmentSchema.statusId,
      })
      .from(enrollmentSchema)
      .innerJoin(studentSchema, eq(enrollmentSchema.studentId, studentSchema.id))
      .innerJoin(classEditionSchema, eq(enrollmentSchema.classEditionId, classEditionSchema.id))
      .innerJoin(classSchema, eq(classEditionSchema.classId, classSchema.id))
      .innerJoin(teachingPlaceSchema, eq(classSchema.teachingPlaceId, teachingPlaceSchema.id))
      .innerJoin(neighborhoodSchema, eq(teachingPlaceSchema.neighborhoodId, neighborhoodSchema.id))
      .innerJoin(regionSchema, eq(neighborhoodSchema.regionId, regionSchema.id))
      .innerJoin(citySchema, eq(neighborhoodSchema.cityId, citySchema.id))
      .leftJoin(addressSchema, eq(studentSchema.addressId, addressSchema.id))
      .where(eq(regionSchema.id, regionId))

    const [
      genderIdentities,
      ethnicities,
      propertyLocationCategories,
      highSchoolStatuses,
      classOptions,
      enrollmentStatuses,
    ] = await Promise.all([
      this.db.select().from(genderIdentitySchema),
      this.db.select().from(ethnicitySchema),
      this.db.select().from(propertyLocationCategorySchema),
      this.db.select().from(highSchoolStatusSchema),
      this.db.select().from(classOptionSchema),
      this.db.select().from(enrollmentStatusSchema),
    ])

    return enrollments.map((enrollment) => {
      const genderIdentity = genderIdentities.find((g) => g.id === enrollment.genderIdentityId)
      const ethnicity = ethnicities.find((e) => e.id === enrollment.ethnicityId)
      const teachingPlacePropertyCategory = propertyLocationCategories.find(
        (p) => p.id === enrollment.teachingPlacePropertyLocationCategoryId,
      )
      const addressPropertyCategory = propertyLocationCategories.find(
        (p) => p.id === enrollment.addressPropertyLocationCategoryId,
      )
      const highSchoolStatus = highSchoolStatuses.find((h) => h.id === enrollment.highSchoolStatusId)
      const classOption = classOptions.find((o) => o.id === enrollment.classOptionId)
      const enrollmentStatus = enrollmentStatuses.find((s) => s.id === enrollment.enrollmentStatusId)

      return {
        regionName: enrollment.regionName,
        cityName: enrollment.cityName,
        teachingPlaceName: enrollment.teachingPlaceName,
        teachingPlacePropertyLocationCategoryName: teachingPlacePropertyCategory?.name || null,
        teachingPlaceTraditionalCommunityName: enrollment.teachingPlaceTraditionalCommunityName,
        studentName: enrollment.studentName,
        socialName: enrollment.socialName,
        cpf: enrollment.cpf,
        rg: enrollment.rg,
        dateBirth: enrollment.dateBirth,
        telephone: enrollment.telephone,
        email: enrollment.email,
        genderIdentityName: genderIdentity?.name || '',
        ethnicityName: ethnicity?.name || '',
        addressStreet: enrollment.addressStreet,
        addressNumber: enrollment.addressNumber,
        addressNeighborhood: enrollment.addressNeighborhood,
        zipCode: enrollment.zipCode,
        addressCity: enrollment.addressCity,
        addressPropertyLocationCategoryName: addressPropertyCategory?.name || null,
        addressTraditionalCommunityName: enrollment.addressTraditionalCommunityName,
        highSchoolStatusName: highSchoolStatus?.name || '',
        classOptionName: classOption?.name || '',
        enrollmentDate: enrollment.enrollmentDate,
        enrollmentStatusName: enrollmentStatus?.name || '',
      }
    })
  }
}
