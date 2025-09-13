import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { ListClassOptionsUseCase } from './list-class-options.use-case'
import { ListClassStatusesUseCase } from './list-class-statuses.use-case'
import { ListHighschoolStatusesUseCase } from './list-highschool-statuses.use-case'
import { ListStudentStatusesUseCase } from './list-student-statuses.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListStudentStatusesUseCase,
  ],
  exports: [
    ListClassOptionsUseCase,
    ListClassStatusesUseCase,
    ListHighschoolStatusesUseCase,
    ListStudentStatusesUseCase,
  ],
})
export class ResourceUseCasesModule {}
