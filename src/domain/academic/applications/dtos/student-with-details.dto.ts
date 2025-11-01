import { AddressWithDetailsDTO } from '@root/domain/location/applications/dtos/address-with-details.dto'
import { Ethnicities } from '@root/domain/resource/enterprise/interfaces/ethnicity'
import { GenderIdentities } from '@root/domain/resource/enterprise/interfaces/gender-identity'
import { HighschoolStatus } from '@root/domain/resource/enterprise/interfaces/highschool-status'

import { EnrollmentWithDetailsDTO } from './enrollment-with-details.dto'

export interface StudentWithDetailsDTO {
  id: number
  name: string
  socialName?: string | null
  cpf: string
  rg?: string | null
  dateBirth?: string | null
  telephone?: string | null
  email?: string | null
  address?: AddressWithDetailsDTO
  classEnrollments: EnrollmentWithDetailsDTO[]
  genderIdentity: {
    id: number
    name: GenderIdentities
  }
  ethnicity: {
    id: number
    name: Ethnicities
  }
  highSchoolStatus: {
    id: number
    name: HighschoolStatus
  }
  createdAt: Date
  updatedAt: Date
}
