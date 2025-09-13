import { Region } from '@domain/location/enterprise/entities/region.entity'

export abstract class CityRepository {
  abstract create(region: Region): Promise<void>
  abstract findByName(name: string): Promise<Region | null>
  abstract findAll(): Promise<Region[]>
}
