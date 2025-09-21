import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { ListClassOptionsUseCase } from './list-class-options.use-case'
import { ListClassStatusesUseCase } from './list-class-statuses.use-case'
import { ListEnrollmentStatusesUseCase } from './list-enrollment-statuses.use-case'
import { ListHighschoolStatusesUseCase } from './list-highschool-statuses.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListEnrollmentStatusesUseCase,
  ],
  exports: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListEnrollmentStatusesUseCase,
  ],
})
export class ResourceUseCasesModule {}
