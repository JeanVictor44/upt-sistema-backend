import { Resource } from '@root/core/domain/resource'

import { ClassOption } from '@domain/resource/enterprise/interfaces/class-options'
import { ClassStatus } from '@domain/resource/enterprise/interfaces/class-statuses'
import { HighschoolStatus } from '@domain/resource/enterprise/interfaces/highschool-statuses'
import { StudentStatus } from '@domain/resource/enterprise/interfaces/student-statuses'

export abstract class ResourceRepository {
  abstract findAllClassOptions(): Promise<Resource<ClassOption>[]>
  abstract findAllClassStatuses(): Promise<Resource<ClassStatus>[]>
  abstract findAllHighschoolStatuses(): Promise<Resource<HighschoolStatus>[]>
  abstract findAllStudentStatuses(): Promise<Resource<StudentStatus>[]>
}
