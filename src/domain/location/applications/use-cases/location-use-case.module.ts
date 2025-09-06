import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { CreateRegionUseCase } from './create-region.use-case'
import { ListRegionsUseCase } from './list-regions.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [CreateRegionUseCase, ListRegionsUseCase],
  exports: [CreateRegionUseCase, ListRegionsUseCase],
})
export class LocationUseCasesModule {}
