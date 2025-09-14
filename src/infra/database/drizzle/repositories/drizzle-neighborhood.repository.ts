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

@Injectable()
export class DrizzleNeighborhoodRepository implements NeighborhoodRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(neighborhood: Neighborhood): Promise<void> {
    const preparedData = NeighborhoodMappers.toPersistence(neighborhood)

    await this.db.insert(neighborhoodSchema).values(preparedData)
  }

  async findByCompositeKeys(data: FindByCompositeKeysProps): Promise<Neighborhood | null> {
    const neighborhood = await this.db.query.neighborhoodSchema.findFirst({
      where: and(
        eq(neighborhoodSchema.name, data.name),
        eq(neighborhoodSchema.cityId, data.cityId),
        eq(neighborhoodSchema.regionId, data.regionId),
      ),
    })

    if (!neighborhood) return null

    return NeighborhoodMappers.toDomain(neighborhood)
  }
}
