import { Module } from '@nestjs/common'
import { AuthenticationUseCasesModule } from '@root/domain/authentication/applications/use-cases/authentication-use-case.module'
import { EditionUseCasesModule } from '@root/domain/edition/applications/use-cases/edition-use-case.module'
import { LocationUseCasesModule } from '@root/domain/location/applications/use-cases/location-use-case.module'
import { ResourceUseCasesModule } from '@root/domain/resource/applications/use-cases/resource-use-case.module'

import { SessionController } from './controllers/authentication/session.controller'
import { CreateEditionController } from './controllers/edition/create-edition.controller'
import { ListEditionsController } from './controllers/edition/list-editions.controller'
import { CreateCityController } from './controllers/location/create-city.controller'
import { CreateNeighborhoodController } from './controllers/location/create-neighborhood.controller'
import { CreateRegionController } from './controllers/location/create-region.controller'
import { CreateTeachingPlaceController } from './controllers/location/create-teaching-place.controller'
import { ListCitiesController } from './controllers/location/list-cities.controller'
import { ListNeighborhoodsController } from './controllers/location/list-neighborhoods.controller'
import { ListRegionsController } from './controllers/location/list-regions.controller'
import { ListTeachingPlaceController } from './controllers/location/list-teaching-place.controller'
import { ListClassOptionsController } from './controllers/resources/list-class-options.controller'
import { ListClassStatusController } from './controllers/resources/list-class-status.controller'
import { ListEnrollmentStatusController } from './controllers/resources/list-enrollment-status.controller'
import { ListHighshoolStatusController } from './controllers/resources/list-highshool.controller'

@Module({
  imports: [AuthenticationUseCasesModule, LocationUseCasesModule, ResourceUseCasesModule, EditionUseCasesModule],
  controllers: [
    SessionController,
    CreateRegionController,
    ListRegionsController,
    ListCitiesController,
    CreateCityController,
    ListClassOptionsController,
    ListClassStatusController,
    ListEnrollmentStatusController,
    ListHighshoolStatusController,
    CreateNeighborhoodController,
    ListNeighborhoodsController,
    CreateTeachingPlaceController,
    ListTeachingPlaceController,
    CreateEditionController,
    ListEditionsController,
  ],
})
export class PresentationsModule {}
