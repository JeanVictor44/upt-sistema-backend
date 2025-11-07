import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { ListClassOptionsUseCase } from './list-class-options.use-case'
import { ListClassStatusesUseCase } from './list-class-statuses.use-case'
import { ListEnrollmentStatusesUseCase } from './list-enrollment-statuses.use-case'
import { ListEthnicitiesUseCase } from './list-ethnicity.use-case'
import { ListGenderIdentitiesUseCase } from './list-gender.use-case'
import { ListHighschoolStatusesUseCase } from './list-highschool-statuses.use-case'
import { ListPropertyLocationsUseCase } from './list-property-location-category.user-case'
import { ListRolesUseCase } from './list-roles.use-case'
import { ListShiftsUseCase } from './list-shifts.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListEnrollmentStatusesUseCase,
    ListEthnicitiesUseCase,
    ListGenderIdentitiesUseCase,
    ListPropertyLocationsUseCase,
    ListShiftsUseCase,
    ListRolesUseCase,
  ],
  exports: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListEnrollmentStatusesUseCase,
    ListEthnicitiesUseCase,
    ListGenderIdentitiesUseCase,
    ListPropertyLocationsUseCase,
    ListShiftsUseCase,
    ListRolesUseCase,
  ],
})
export class ResourceUseCasesModule {}
