import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { CreateCityUseCase } from './create-city.use-case'
import { CreateNeighborhoodUseCase } from './create-neighborhood.use-case'
import { CreateRegionUseCase } from './create-region.use-case'
import { ListCitiesUseCase } from './list-cities.use-case'
import { ListNeighborhoodUseCase } from './list-neighborhood.use-case'
import { ListRegionsUseCase } from './list-regions.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    CreateRegionUseCase,
    ListRegionsUseCase,
    ListCitiesUseCase,
    CreateCityUseCase,
    CreateNeighborhoodUseCase,
    ListNeighborhoodUseCase,
  ],
  exports: [
    CreateRegionUseCase,
    ListRegionsUseCase,
    ListCitiesUseCase,
    CreateCityUseCase,
    CreateNeighborhoodUseCase,
    ListNeighborhoodUseCase,
  ],
})
export class LocationUseCasesModule {}
