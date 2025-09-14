import { Inject, Injectable } from '@nestjs/common'
import { NeighborhoodWithDetailsDTO } from '@root/domain/location/applications/dtos/neighborhood-with-details.dto'
import { NeighborhoodQueryRepository } from '@root/domain/location/applications/repositories/neighborhood-query.repository'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { citySchema, neighborhoodSchema, regionSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleNeighborhoodQueryRepository implements NeighborhoodQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllWithDetails(): Promise<NeighborhoodWithDetailsDTO[]> {
    const neighborhoods = await this.db
      .select({
        id: neighborhoodSchema.id,
        name: neighborhoodSchema.name,
        city: {
          id: citySchema.id,
          name: citySchema.name,
        },
        region: {
          id: regionSchema.id,
          name: regionSchema.name,
        },
        createdAt: neighborhoodSchema.createdAt,
        updatedAt: neighborhoodSchema.updatedAt,
      })
      .from(neighborhoodSchema)
      .innerJoin(citySchema, eq(neighborhoodSchema.cityId, citySchema.id))
      .innerJoin(regionSchema, eq(neighborhoodSchema.regionId, regionSchema.id))

    return neighborhoods
  }
}
