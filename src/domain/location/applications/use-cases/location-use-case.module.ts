import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { CreateCityUseCase } from './create-city.use-case'
import { CreateNeighborhoodUseCase } from './create-neighborhood.use-case'
import { CreateRegionUseCase } from './create-region.use-case'
import { CreateTeachingPlaceUseCase } from './create-teaching-place.use-case'
import { DeleteCityUseCase } from './delete-city-use-case'
import { DeleteNeighborhoodUseCase } from './delete-neighborhood.use-case'
import { DeleteRegionUseCase } from './delete-region.use-case'
import { EditCityUseCase } from './edit-city.use-case'
import { EditNeighborhoodUseCase } from './edit-neighborhood.use-case'
import { EditRegionUseCase } from './edit-region.use-case'
import { EditTeachingPlaceUseCase } from './edit-teaching-place.use-case'
import { ListCitiesUseCase } from './list-cities.use-case'
import { ListNeighborhoodUseCase } from './list-neighborhood.use-case'
import { ListRegionsUseCase } from './list-regions.use-case'
import { ListTeachingPlacesUseCase } from './list-teaching-places.use-case'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    CreateRegionUseCase,
    ListRegionsUseCase,
    ListCitiesUseCase,
    CreateCityUseCase,
    CreateNeighborhoodUseCase,
    ListNeighborhoodUseCase,
    CreateTeachingPlaceUseCase,
    ListTeachingPlacesUseCase,
    EditCityUseCase,
    EditRegionUseCase,
    DeleteCityUseCase,
    DeleteRegionUseCase,
    EditNeighborhoodUseCase,
    DeleteNeighborhoodUseCase,
    EditTeachingPlaceUseCase,
  ],
  exports: [
    CreateRegionUseCase,
    ListRegionsUseCase,
    ListCitiesUseCase,
    CreateCityUseCase,
    CreateNeighborhoodUseCase,
    ListNeighborhoodUseCase,
    CreateTeachingPlaceUseCase,
    ListTeachingPlacesUseCase,
    EditCityUseCase,
    EditRegionUseCase,
    DeleteCityUseCase,
    DeleteRegionUseCase,
    EditNeighborhoodUseCase,
    DeleteNeighborhoodUseCase,
    EditTeachingPlaceUseCase,
  ],
})
export class LocationUseCasesModule {}
