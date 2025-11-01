import { Inject, Injectable } from '@nestjs/common'
import {
  FindByCompositeKeysProps,
  NeighborhoodRepository,
} from '@root/domain/location/applications/repositories/neighborhood.repository'
import { Neighborhood } from '@root/domain/location/enterprise/entities/neighborhood.entity'
import { and, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { NeighborhoodMappers } from '../mappers/neighborhood.mappers'
import { neighborhoodSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { lower } from '../utils/lower'

@Injectable()
export class DrizzleNeighborhoodRepository implements NeighborhoodRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(neighborhood: Neighborhood): Promise<void> {
    const preparedData = NeighborhoodMappers.toPersistence(neighborhood)
    await this.db.insert(neighborhoodSchema).values(preparedData)
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(neighborhoodSchema).where(eq(neighborhoodSchema.id, id))
  }

  async save(neighborhood: Neighborhood): Promise<void> {
    const preparedData = NeighborhoodMappers.toPersistence(neighborhood)

    await this.db.update(neighborhoodSchema).set(preparedData).where(eq(neighborhoodSchema.id, neighborhood.id))
  }

  async findByCompositeKeys(data: FindByCompositeKeysProps): Promise<Neighborhood | null> {
    const neighborhood = await this.db.query.neighborhoodSchema.findFirst({
      where: and(
        eq(lower(neighborhoodSchema.name), data.name.toLowerCase()),
        eq(neighborhoodSchema.cityId, data.cityId),
        eq(neighborhoodSchema.regionId, data.regionId),
      ),
    })

    if (!neighborhood) return null

    return NeighborhoodMappers.toDomain(neighborhood)
  }

  async findById(id: number): Promise<Neighborhood | null> {
    const neighborhood = await this.db.query.neighborhoodSchema.findFirst({
      where: eq(neighborhoodSchema.id, id),
    })

    if (!neighborhood) return null

    return NeighborhoodMappers.toDomain(neighborhood)
  }

  async findByRegionId(regionId: number): Promise<Neighborhood[]> {
    const neighborhoods = await this.db.query.neighborhoodSchema.findMany({
      where: eq(neighborhoodSchema.regionId, regionId),
    })

    return neighborhoods.map(NeighborhoodMappers.toDomain)
  }
}
