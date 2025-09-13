import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { CreateCityUseCase } from './create-city.use-case'
import { CreateRegionUseCase } from './create-region.use-case'
import { ListCitiesUseCase } from './list-cities.use-case'
import { ListRegionsUseCase } from './list-regions.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [CreateRegionUseCase, ListRegionsUseCase, ListCitiesUseCase, CreateCityUseCase],
  exports: [CreateRegionUseCase, ListRegionsUseCase, ListCitiesUseCase, CreateCityUseCase],
})
export class LocationUseCasesModule {}
