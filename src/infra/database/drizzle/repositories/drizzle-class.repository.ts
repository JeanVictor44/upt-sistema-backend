import { Inject, Injectable } from '@nestjs/common'
import {
  FindByCompositeKeysProps,
  ClassRepository,
} from '@root/domain/academic/applications/repositories/class-repository'
import { Class } from '@root/domain/academic/enterprise/entities/class.entity'
import { and, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { ClassMappers } from '../mappers/class.mapper'
import { classSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { lower } from '../utils/lower'

@Injectable()
export class DrizzleClassRepository implements ClassRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(Class: Class): Promise<void> {
    const preparedData = ClassMappers.toPersistence(Class)
    await this.db.insert(classSchema).values(preparedData)
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(classSchema).where(eq(classSchema.id, id))
  }

  async save(Class: Class): Promise<void> {
    const preparedData = ClassMappers.toPersistence(Class)

    await this.db.update(classSchema).set(preparedData).where(eq(classSchema.id, Class.id))
  }

  async findByCompositeKeys(data: FindByCompositeKeysProps): Promise<Class | null> {
    const classResult = await this.db.query.classSchema.findFirst({
      where: and(
        eq(lower(classSchema.name), data.name.toLowerCase()),
        eq(classSchema.optionId, data.optionId),
        eq(classSchema.shiftId, data.shiftId),
        eq(classSchema.teachingPlaceId, data.teachingPlaceId),
      ),
    })

    if (!classResult) return null

    return ClassMappers.toDomain(classResult)
  }

  async findById(id: number): Promise<Class | null> {
    const classResult = await this.db.query.classSchema.findFirst({
      where: eq(classSchema.id, id),
    })

    if (!classResult) return null

    return ClassMappers.toDomain(classResult)
  }
}
