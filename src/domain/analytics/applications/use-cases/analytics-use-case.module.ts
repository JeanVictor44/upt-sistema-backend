import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { FindBigNumbersUseCase } from './find-big-numbers.use-case'
import { FindDistributionByEthnicityUseCase } from './find-distribution-by-ethnicity.use-case'
import { FindDistributionByGenderIdentityUseCase } from './find-distribution-by-gender-identity.use-case'
import { FindDistributionByPropertyLocationUseCase } from './find-distribution-by-property-location.use-case'
import { FindDistributionByShiftUseCase } from './find-distribution-by-shift.use-case'
import { FindEnrollmentEvolutionUseCase } from './find-enrollment-evolution.use-case'
import { FindTopClassEditionsUseCase } from './find-top-class-editions-enrollment.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    FindBigNumbersUseCase,
    FindDistributionByShiftUseCase,
    FindTopClassEditionsUseCase,
    FindDistributionByGenderIdentityUseCase,
    FindDistributionByEthnicityUseCase,
    FindDistributionByPropertyLocationUseCase,
    FindEnrollmentEvolutionUseCase,
  ],
  exports: [
    FindBigNumbersUseCase,
    FindDistributionByShiftUseCase,
    FindTopClassEditionsUseCase,
    FindDistributionByGenderIdentityUseCase,
    FindDistributionByEthnicityUseCase,
    FindDistributionByPropertyLocationUseCase,
    FindEnrollmentEvolutionUseCase,
  ],
})
export class AnalyticsUseCasesModule {}
