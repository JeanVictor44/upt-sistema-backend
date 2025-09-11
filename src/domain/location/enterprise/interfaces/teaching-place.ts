import { Neighborhood } from '@domain/location/enterprise/entities/neighborhood.entity'

export type TeachingPlaceProps = {
  name: string
  neighborhood: Neighborhood
  createdAt: Date
  updatedAt?: Date
}
