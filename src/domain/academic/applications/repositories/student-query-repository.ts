import { StudentWithDetailsDTO } from '../dtos/student-with-details.dto'

export abstract class StudentQueryRepository {
  abstract findAllWithDetails(): Promise<StudentWithDetailsDTO[]>
}
