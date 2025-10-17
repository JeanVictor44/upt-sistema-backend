import { Inject, Injectable } from '@nestjs/common'
import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-option'
import { ClassStatus } from '@root/domain/resource/enterprise/interfaces/class-status'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import { Ethnicities } from '@root/domain/resource/enterprise/interfaces/ethnicity'
import { GenderIdentities } from '@root/domain/resource/enterprise/interfaces/gender-identity'
import { HighschoolStatus } from '@root/domain/resource/enterprise/interfaces/highschool-status'
import { PropertyLocationCategory } from '@root/domain/resource/enterprise/interfaces/property-location-category'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'
import { Shift } from '@root/domain/resource/enterprise/interfaces/shift'

import { Resource } from '@core/domain/resource'

import { ResourceRepository } from '@domain/resource/applications/repositories/resource-repository'

import { DATABASE_CONNECTION } from '../database-connection'
import { ResourceMappers } from '../mappers/resource.mappers'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleResourcesRepository implements ResourceRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllClassOptions(): Promise<Resource<ClassOption>[]> {
    const classOptions = await this.db.query.classOptionSchema.findMany()

    return classOptions.map((classOption) => ResourceMappers.toDomain(classOption))
  }

  async findAllShifts(): Promise<Resource<Shift>[]> {
    const shifts = await this.db.query.shiftSchema.findMany()

    return shifts.map((shift) => ResourceMappers.toDomain(shift))
  }

  async findAllClassStatuses(): Promise<Resource<ClassStatus>[]> {
    const classStatuses = await this.db.query.classStatusSchema.findMany()

    return classStatuses.map((classStatus) => ResourceMappers.toDomain(classStatus))
  }

  async findAllHighschoolStatuses(): Promise<Resource<HighschoolStatus>[]> {
    const highschoolStatuses = await this.db.query.highSchoolStatusSchema.findMany()

    return highschoolStatuses.map((highschoolStatus) => ResourceMappers.toDomain(highschoolStatus))
  }
  async findAllEnrollmentStatuses(): Promise<Resource<EnrollmentStatus>[]> {
    const enrollmentStatuses = await this.db.query.enrollmentStatusSchema.findMany()

    return enrollmentStatuses.map((enrollmentStatus) => ResourceMappers.toDomain(enrollmentStatus))
  }

  async findAllPropertyLocations(): Promise<Resource<PropertyLocationCategory>[]> {
    const propertyLocations = await this.db.query.propertyLocationCategorySchema.findMany()

    return propertyLocations.map((propertyLocation) => ResourceMappers.toDomain(propertyLocation))
  }

  async findAllGenders(): Promise<Resource<GenderIdentities>[]> {
    const genders = await this.db.query.genderIdentitySchema.findMany()

    return genders.map((gender) => ResourceMappers.toDomain(gender))
  }

  async findAllEthnicities(): Promise<Resource<Ethnicities>[]> {
    const ethnicities = await this.db.query.ethnicitySchema.findMany()

    return ethnicities.map((ethnicity) => ResourceMappers.toDomain(ethnicity))
  }

  async findAllRoles(): Promise<Resource<RolesEnum>[]> {
    const roles = await this.db.query.roleSchema.findMany()
    return roles.map((role) => ResourceMappers.toDomain(role))
  }

  async findRoleById(id: number): Promise<Resource<RolesEnum> | null> {
    const role = await this.db.query.roleSchema.findFirst({
      where: (field, sql) => sql.eq(field.id, id),
    })

    if (!role) return null

    return ResourceMappers.toDomain(role)
  }
}
