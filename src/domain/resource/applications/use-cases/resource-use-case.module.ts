import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { ListClassOptionsUseCase } from './list-class-options.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [ListClassOptionsUseCase],
  exports: [ListClassOptionsUseCase],
})
export class ResourceUseCasesModule {}
