import { BigNumbersDto } from '../dtos/big-numbers.dto'
import { DistributionByEthnicitytDTO } from '../dtos/distribution-by-ethnicity.dto'
import { DistributionByGenderIdentitytDTO } from '../dtos/distribution-by-gender-identity.dto'
import { DistributionByPropertyLocationtDTO } from '../dtos/distribution-by-property-location.dto'
import { DistributionByShiftDTO } from '../dtos/distribution-by-shift.dto'
import { EnrollemntEvolutionDTO } from '../dtos/enrollment-evolution.dto'
import { TopClassEditionEnrollmentDTO } from '../dtos/top-class-edition.dto'

export interface FindDataProps {
  editionId?: number
}

export abstract class AnalyticsQueryRepository {
  abstract findBigNumbers(data: FindDataProps): Promise<BigNumbersDto>
  abstract distributionByShift(data: FindDataProps): Promise<DistributionByShiftDTO[]>
  abstract topClassEditionsEnrollment(data: FindDataProps): Promise<TopClassEditionEnrollmentDTO[]>
  abstract distributionByPropertyLocation(data: FindDataProps): Promise<DistributionByPropertyLocationtDTO[]>
  abstract distributionByGenderIdentity(data: FindDataProps): Promise<DistributionByGenderIdentitytDTO[]>
  abstract distributionByEthnicity(data: FindDataProps): Promise<DistributionByEthnicitytDTO[]>
  abstract enrollmentEvolution(data: FindDataProps): Promise<EnrollemntEvolutionDTO[]>
}
