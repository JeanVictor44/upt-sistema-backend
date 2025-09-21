import { TeachingPlace } from '@domain/location/enterprise/entities/teaching-place.entity'

export interface FindByNameAndNeighborhoodProps {
  name: string
  neighborhoodId: number
}

export abstract class TeachingPlaceRepository {
  abstract create(teachingPlace: TeachingPlace): Promise<void>
  abstract findByNameAndNeighborhood(data: FindByNameAndNeighborhoodProps): Promise<TeachingPlace | null>
}
