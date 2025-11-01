import { Inject, Injectable } from '@nestjs/common'
import { EditionRepository } from '@root/domain/academic/applications/repositories/edition-repository'
import { Edition } from '@root/domain/academic/enterprise/entities/edition.entity'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { EditionMappers } from '../mappers/edition.mappers'
import { editionSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleEditionRepository implements EditionRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(edition: Edition): Promise<void> {
    const preparedData = EditionMappers.toPersistence(edition)

    await this.db.insert(editionSchema).values(preparedData)
  }

  async findByYear(year: number): Promise<Edition | null> {
    const edition = await this.db.query.editionSchema.findFirst({
      where: eq(editionSchema.year, year),
    })

    if (!edition) return null

    return EditionMappers.toDomain(edition)
  }

  async findById(id: number): Promise<Edition | null> {
    const edition = await this.db.query.editionSchema.findFirst({
      where: eq(editionSchema.id, id),
    })

    if (!edition) return null

    return EditionMappers.toDomain(edition)
  }

  async findAll(): Promise<Edition[]> {
    const editions = await this.db.query.editionSchema.findMany()

    return editions.map(EditionMappers.toDomain)
  }
  async save(edition: Edition): Promise<void> {
    const preparedData = EditionMappers.toPersistence(edition)

    await this.db.update(editionSchema).set(preparedData).where(eq(editionSchema.id, edition.id))
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(editionSchema).where(eq(editionSchema.id, id))
  }
}
