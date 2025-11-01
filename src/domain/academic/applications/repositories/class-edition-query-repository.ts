import { ClassEditionWithDetailsDTO } from '../dtos/class-edition-with-details.dto'

export abstract class ClassEditionQueryRepository {
  abstract findAllWithDetails(): Promise<ClassEditionWithDetailsDTO[]>
}
