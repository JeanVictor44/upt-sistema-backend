import { Inject, Injectable } from '@nestjs/common'
import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-option'
import { ClassStatus } from '@root/domain/resource/enterprise/interfaces/class-status'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import { HighschoolStatus } from '@root/domain/resource/enterprise/interfaces/highschool-status'

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
}
