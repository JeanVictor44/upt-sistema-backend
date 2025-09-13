import { City } from '@root/domain/location/enterprise/entities/city.entity'

export class CityViewModel {
  static toHttp(city: City) {
    return {
      id: city.id,
      name: city.name,
      createdAt: city.createdAt,
      updatedAt: city.updatedAt,
    }
  }
}
