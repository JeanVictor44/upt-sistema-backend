import { Inject, Injectable } from '@nestjs/common'

import { Resource } from '@core/domain/resource'

import { ResourceRepository } from '@domain/resource/applications/repositories/resource-repository'
import { ClassOption } from '@domain/resource/enterprise/interfaces/class-options'
import { ClassStatus } from '@domain/resource/enterprise/interfaces/class-statuses'
import { HighschoolStatus } from '@domain/resource/enterprise/interfaces/highschool-statuses'
import { StudentStatus } from '@domain/resource/enterprise/interfaces/student-statuses'

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
  async findAllStudentStatuses(): Promise<Resource<StudentStatus>[]> {
    const studentStatuses = await this.db.query.studentStatusSchema.findMany()

    return studentStatuses.map((studentStatus) => ResourceMappers.toDomain(studentStatus))
  }
}
