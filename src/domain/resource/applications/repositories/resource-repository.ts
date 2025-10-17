import { Resource } from '@root/core/domain/resource'
import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-option'
import { ClassStatus } from '@root/domain/resource/enterprise/interfaces/class-status'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import { Ethnicities } from '@root/domain/resource/enterprise/interfaces/ethnicity'
import { GenderIdentities } from '@root/domain/resource/enterprise/interfaces/gender-identity'
import { HighschoolStatus } from '@root/domain/resource/enterprise/interfaces/highschool-status'
import { PropertyLocationCategory } from '@root/domain/resource/enterprise/interfaces/property-location-category'
import { RolesEnum } from '@root/domain/resource/enterprise/interfaces/role'

import { Shift } from '../../enterprise/interfaces/shift'

export abstract class ResourceRepository {
  abstract findAllClassOptions(): Promise<Resource<ClassOption>[]>
  abstract findAllClassStatuses(): Promise<Resource<ClassStatus>[]>
  abstract findAllHighschoolStatuses(): Promise<Resource<HighschoolStatus>[]>
  abstract findAllEnrollmentStatuses(): Promise<Resource<EnrollmentStatus>[]>
  abstract findAllPropertyLocations(): Promise<Resource<PropertyLocationCategory>[]>
  abstract findAllGenders(): Promise<Resource<GenderIdentities>[]>
  abstract findAllEthnicities(): Promise<Resource<Ethnicities>[]>
  abstract findAllRoles(): Promise<Resource<RolesEnum>[]>
  abstract findAllShifts(): Promise<Resource<Shift>[]>

  abstract findRoleById(id: number): Promise<Resource<RolesEnum> | null>
}
