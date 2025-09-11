import { Inject, Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'
import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-options'

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
}
