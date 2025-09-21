import { Resource } from '@root/core/domain/resource'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'

import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-option'
import { ClassStatus } from '@root/domain/resource/enterprise/interfaces/class-status'
import { HighschoolStatus } from '@root/domain/resource/enterprise/interfaces/highschool-status'

export abstract class ResourceRepository {
  abstract findAllClassOptions(): Promise<Resource<ClassOption>[]>
  abstract findAllClassStatuses(): Promise<Resource<ClassStatus>[]>
  abstract findAllHighschoolStatuses(): Promise<Resource<HighschoolStatus>[]>
  abstract findAllEnrollmentStatuses(): Promise<Resource<EnrollmentStatus>[]>
}
