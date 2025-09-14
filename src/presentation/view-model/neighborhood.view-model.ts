import { NeighborhoodDetailsDto } from '../swagger/location/entities/neighborhood-details.dto'

export class NeighborhoodViewModel {
  static toHttp(neighborhood: NeighborhoodDetailsDto) {
    return {
      id: neighborhood.id,
      name: neighborhood.name,
      city: {
        id: neighborhood.city.id,
        name: neighborhood.city.name,
      },
      region: {
        id: neighborhood.region.id,
        name: neighborhood.region.name,
      },
      createdAt: neighborhood.createdAt,
      updatedAt: neighborhood.updatedAt,
    }
  }
}
