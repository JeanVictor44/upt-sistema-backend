import { TeachingPlaceWithDetailsDTO } from '../dtos/teaching-place-with-details.dto'

export abstract class TeachingPlaceQueryRepository {
  abstract findAllWithDetails(): Promise<TeachingPlaceWithDetailsDTO[]>
}
