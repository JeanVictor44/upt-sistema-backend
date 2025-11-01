import { Inject, Injectable } from '@nestjs/common'
import { AsyncMaybe } from '@root/core/logic/Maybe'
import {
  ClassEditionRepository,
  FindByCompositeKeysProps,
} from '@root/domain/academic/applications/repositories/class-edition-repository'
import { ClassEdition } from '@root/domain/academic/enterprise/entities/class-edition.entity'
import { and, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { ClassEditionMappers } from '../mappers/class-edition.mappers'
import { classEditionSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleClassEditionRepository implements ClassEditionRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(classEdition: ClassEdition): Promise<void> {
    const preparedData = ClassEditionMappers.toPersistence(classEdition)

    await this.db.insert(classEditionSchema).values(preparedData)
  }

  async save(classEdition: ClassEdition): Promise<void> {
    const preparedData = ClassEditionMappers.toPersistence(classEdition)

    await this.db.update(classEditionSchema).set(preparedData).where(eq(classEditionSchema.id, classEdition.id))
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(classEditionSchema).where(eq(classEditionSchema.id, id))
  }

  async findByCompositeKeys(data: FindByCompositeKeysProps): AsyncMaybe<ClassEdition> {
    const classEdition = await this.db.query.classEditionSchema.findFirst({
      where: and(eq(classEditionSchema.editionId, data.editionId), eq(classEditionSchema.classId, data.classId)),
    })

    if (!classEdition) return null

    return ClassEditionMappers.toDomain(classEdition)
  }

  async findById(id: number): AsyncMaybe<ClassEdition> {
    const classEdition = await this.db.query.classEditionSchema.findFirst({
      where: eq(classEditionSchema.id, id),
    })

    if (!classEdition) return null

    return ClassEditionMappers.toDomain(classEdition)
  }

  async findAll(): Promise<ClassEdition[]> {
    const classesEdition = await this.db.query.classEditionSchema.findMany()

    return classesEdition.map(ClassEditionMappers.toDomain)
  }
}
