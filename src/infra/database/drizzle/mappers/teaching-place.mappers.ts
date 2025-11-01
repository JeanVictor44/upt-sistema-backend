import { TeachingPlace } from '@root/domain/location/enterprise/entities/teaching-place.entity'

import { TeachingPlaceSchemaInsertProps, TeachingPlaceSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class TeachingPlaceMappers {
  static toDomain(data: TeachingPlaceSchemaSelectProps): TeachingPlace {
    return TeachingPlace.create(
      {
        name: data.name,
        neighborhoodId: data.neighborhoodId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
        propertyLocationCategoryId: data.propertyLocationCategoryId,
        traditionalCommunityName: data.traditionalCommunityName || undefined,
      },
      data.id,
    )
  }

  static toPersistence(data: TeachingPlace): TeachingPlaceSchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      neighborhoodId: data.neighborhoodId,
      propertyLocationCategoryId: data.propertyLocationCategoryId,
      traditionalCommunityName: data.traditionalCommunityName,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
