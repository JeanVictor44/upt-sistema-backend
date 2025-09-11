import { City } from '@domain/location/enterprise/entities/city.entity'
import { Region } from '@domain/location/enterprise/entities/region.entity'

export type NeighborhoodProps = {
  name: string
  city: City
  region: Region
  createdAt: Date
  updatedAt?: Date
}
