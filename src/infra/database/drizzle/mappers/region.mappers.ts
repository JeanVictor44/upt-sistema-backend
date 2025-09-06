import { Region } from '@root/domain/location/enterprise/entities/region.entity'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { RegionSchemaSelectProps, RegionSchemaInsertProps } from '@infra/database/drizzle/schemas'

export class RegionMappers {
  static toDomain(data: RegionSchemaSelectProps): Region {
    return Region.create(
      {
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      new UniqueEntityID(data.id),
    )
  }

  static toPersistence(data: Region): RegionSchemaInsertProps {
    return {
      id: data.id.toValue(),
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
