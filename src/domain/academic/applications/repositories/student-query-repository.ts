import { StudentWithDetailsDTO } from '../dtos/student-with-details.dto'

export interface FindAllStudentsWithDetailsParams {
  teachingPlaceId?: number
  regionId?: number
}

export abstract class StudentQueryRepository {
  abstract findAllWithDetails(data: FindAllStudentsWithDetailsParams): Promise<StudentWithDetailsDTO[]>
}
