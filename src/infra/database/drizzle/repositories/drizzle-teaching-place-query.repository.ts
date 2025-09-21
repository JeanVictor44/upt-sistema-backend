import { Inject, Injectable } from '@nestjs/common'
import { TeachingPlaceWithDetailsDTO } from '@root/domain/location/applications/dtos/teaching-place-with-details.dto'
import { TeachingPlaceQueryRepository } from '@root/domain/location/applications/repositories/teaching-place-query.repository'

import { DATABASE_CONNECTION } from '../database-connection'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleTeachingPlaceQueryRepository implements TeachingPlaceQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllWithDetails(): Promise<TeachingPlaceWithDetailsDTO[]> {
    const teachingPlaces = await this.db.query.teachingPlaceSchema.findMany({
      with: {
        neighborhood: {
          with: {
            city: true,
            region: true,
          },
        },
      },
    })

    return teachingPlaces.map((teachingPlace) => ({
      id: teachingPlace.id,
      name: teachingPlace.name,
      neighborhood: {
        id: teachingPlace.neighborhood.id,
        name: teachingPlace.neighborhood.name,
        city: {
          id: teachingPlace.neighborhood.city.id,
          name: teachingPlace.neighborhood.city.name,
        },
        region: {
          id: teachingPlace.neighborhood.region.id,
          name: teachingPlace.neighborhood.region.name,
        },
        createdAt: teachingPlace.neighborhood.createdAt,
        updatedAt: teachingPlace.neighborhood.updatedAt,
      },
      createdAt: teachingPlace.createdAt,
      updatedAt: teachingPlace.updatedAt,
    }))
  }
}
