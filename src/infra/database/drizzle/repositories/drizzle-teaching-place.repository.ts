import { Inject, Injectable } from '@nestjs/common'
import { AsyncMaybe } from '@root/core/logic/Maybe'
import {
  FindByNameAndNeighborhoodProps,
  TeachingPlaceRepository,
} from '@root/domain/location/applications/repositories/teaching-place.repository'
import { TeachingPlace } from '@root/domain/location/enterprise/entities/teaching-place.entity'
import { and, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { TeachingPlaceMappers } from '../mappers/teaching-place.mappers'
import { teachingPlaceSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { lower } from '../utils/lower'

@Injectable()
export class DrizzleTeachingPlaceRepository implements TeachingPlaceRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(teachingPlace: TeachingPlace): Promise<void> {
    const preparedData = TeachingPlaceMappers.toPersistence(teachingPlace)

    await this.db.insert(teachingPlaceSchema).values(preparedData)
  }

  async save(teachingPlace: TeachingPlace): Promise<void> {
    const preparedData = TeachingPlaceMappers.toPersistence(teachingPlace)

    await this.db.update(teachingPlaceSchema).set(preparedData).where(eq(teachingPlaceSchema.id, teachingPlace.id))
  }

  async findById(id: number): AsyncMaybe<TeachingPlace> {
    const teachingPlace = await this.db.query.teachingPlaceSchema.findFirst({
      where: eq(teachingPlaceSchema.id, id),
    })

    if (!teachingPlace) return null

    return TeachingPlaceMappers.toDomain(teachingPlace)
  }

  async findByNameAndNeighborhood({
    name,
    neighborhoodId,
  }: FindByNameAndNeighborhoodProps): Promise<TeachingPlace | null> {
    const teachingPlace = await this.db.query.teachingPlaceSchema.findFirst({
      where: and(
        eq(lower(teachingPlaceSchema.name), name.toLowerCase()),
        eq(teachingPlaceSchema.neighborhoodId, neighborhoodId),
      ),
    })

    if (!teachingPlace) return null

    return TeachingPlaceMappers.toDomain(teachingPlace)
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(teachingPlaceSchema).where(eq(teachingPlaceSchema.id, id))
  }
}
