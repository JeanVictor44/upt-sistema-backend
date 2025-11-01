import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { EnvModule } from '@infra/env/env.module'

import { CreateAddressUseCase } from './address/create-address.use-case'
import { DeleteAddressUseCase } from './address/delete-address-use-case'
import { EditAddressUseCase } from './address/edit-address.use-case'
import { CreateCityUseCase } from './city/create-city.use-case'
import { DeleteCityUseCase } from './city/delete-city-use-case'
import { EditCityUseCase } from './city/edit-city.use-case'
import { ListCitiesUseCase } from './city/list-cities.use-case'
import { CreateNeighborhoodUseCase } from './neighborhood/create-neighborhood.use-case'
import { DeleteNeighborhoodUseCase } from './neighborhood/delete-neighborhood.use-case'
import { EditNeighborhoodUseCase } from './neighborhood/edit-neighborhood.use-case'
import { ListNeighborhoodUseCase } from './neighborhood/list-neighborhood.use-case'
import { CreateRegionUseCase } from './region/create-region.use-case'
import { DeleteRegionUseCase } from './region/delete-region.use-case'
import { EditRegionUseCase } from './region/edit-region.use-case'
import { ListRegionsUseCase } from './region/list-regions.use-case'
import { CreateTeachingPlaceUseCase } from './teaching-place/create-teaching-place.use-case'
import { DeleteTeachingPlaceUseCase } from './teaching-place/delete-teaching-place.use-case'
import { EditTeachingPlaceUseCase } from './teaching-place/edit-teaching-place.use-case'
import { ListTeachingPlacesUseCase } from './teaching-place/list-teaching-places.use-case'

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
    DeleteTeachingPlaceUseCase,
    CreateAddressUseCase,
    DeleteAddressUseCase,
    EditAddressUseCase,
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
    DeleteTeachingPlaceUseCase,
    CreateAddressUseCase,
    DeleteAddressUseCase,
    EditAddressUseCase,
  ],
})
export class LocationUseCasesModule {}
