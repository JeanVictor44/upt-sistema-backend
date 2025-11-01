import { ClassWithDetailsDTO } from '../dtos/class-with-details.dto'

export abstract class ClassQueryRepository {
  abstract findAllWithDetails(): Promise<ClassWithDetailsDTO[]>
}
