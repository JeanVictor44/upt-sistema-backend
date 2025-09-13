import { City } from '@root/domain/location/enterprise/entities/city.entity'

import { CitySchemaSelectProps, CitySchemaInsertProps } from '@infra/database/drizzle/schemas'

export class CityMappers {
  static toDomain(data: CitySchemaSelectProps): City {
    return City.create(
      {
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: City): CitySchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
