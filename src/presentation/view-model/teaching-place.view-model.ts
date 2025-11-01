import { TeachingPlaceWithDetailsDTO } from '@root/domain/location/applications/dtos/teaching-place-with-details.dto'

export class TeachingPlaceViewModel {
  static toHttp(teachingPlace: TeachingPlaceWithDetailsDTO) {
    return {
      id: teachingPlace.id,
      name: teachingPlace.name,
      propertyLocationCategory: {
        id: teachingPlace.propertyLocationCategory.id,
        name: teachingPlace.propertyLocationCategory.name,
      },
      traditionalCommunityName: teachingPlace.traditionalCommunityName,
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
    }
  }
}
