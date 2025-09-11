import { Region } from '@root/domain/location/enterprise/entities/region.entity'

export class RegionViewModel {
  static toHttp(region: Region) {
    return {
      id: region.id,
      name: region.name,
      createdAt: region.createdAt,
      updatedAt: region.updatedAt,
    }
  }
}
