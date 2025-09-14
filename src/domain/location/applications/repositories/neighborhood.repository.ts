import { Neighborhood } from '@domain/location/enterprise/entities/neighborhood.entity'

export interface FindByCompositeKeysProps {
  name: string
  cityId: number
  regionId: number
}

export abstract class NeighborhoodRepository {
  abstract create(region: Neighborhood): Promise<void>
  abstract findByCompositeKeys(data: FindByCompositeKeysProps): Promise<Neighborhood | null>
}
