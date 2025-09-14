import { NeighborhoodWithDetailsDTO } from '../dtos/neighborhood-with-details.dto'

export abstract class NeighborhoodQueryRepository {
  abstract findAllWithDetails(): Promise<NeighborhoodWithDetailsDTO[]>
}
