import { Neighborhood } from '@root/domain/location/enterprise/entities/neighborhood.entity'

import { NeighborhoodSchemaInsertProps, NeighborhoodSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class NeighborhoodMappers {
  static toDomain(data: NeighborhoodSchemaSelectProps): Neighborhood {
    return Neighborhood.create(
      {
        name: data.name,
        cityId: data.cityId,
        regionId: data.regionId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: Neighborhood): NeighborhoodSchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      cityId: data.cityId,
      regionId: data.regionId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
