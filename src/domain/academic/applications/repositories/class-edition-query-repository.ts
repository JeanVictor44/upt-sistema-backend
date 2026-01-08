import { ClassEditionWithDetailsDTO } from '../dtos/class-edition-with-details.dto'

export interface findAllClassEditionsWithDetailsProps {
  regionId?: number
  teachingPlacesIds?: number[]
}
export abstract class ClassEditionQueryRepository {
  abstract findAllWithDetails(data?: findAllClassEditionsWithDetailsProps): Promise<ClassEditionWithDetailsDTO[]>
}
