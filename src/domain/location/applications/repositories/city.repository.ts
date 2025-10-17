import { AsyncMaybe } from '@root/core/logic/Maybe'

import { Region } from '@domain/location/enterprise/entities/region.entity'

export abstract class CityRepository {
  abstract create(region: Region): Promise<void>
  abstract delete(id: number): Promise<void>
  abstract save(region: Region): Promise<void>
  abstract findByName(name: string): AsyncMaybe<Region>
  abstract findAll(): Promise<Region[]>
  abstract findById(id: number): AsyncMaybe<Region>
}
