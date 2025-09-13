import { Module } from '@nestjs/common'
import { AuthenticationUseCasesModule } from '@root/domain/authentication/applications/use-cases/authentication-use-case.module'
import { LocationUseCasesModule } from '@root/domain/location/applications/use-cases/location-use-case.module'
import { ResourceUseCasesModule } from '@root/domain/resource/applications/use-cases/resource-use-case.module'

import { SessionController } from './controllers/authentication/session.controller'
import { CreateCityController } from './controllers/location/create-city.controller'
import { CreateRegionController } from './controllers/location/create-region.controller'
import { ListCitiesController } from './controllers/location/list-cities.controller'
import { ListRegionsController } from './controllers/location/list-regions.controller'
import { ListClassOptionsController } from './controllers/resources/list-class-options.controller'
import { ListClassStatusController } from './controllers/resources/list-class-status.controller'
import { ListHighshoolStatusController } from './controllers/resources/list-highshool.controller'
import { ListStudentStatusController } from './controllers/resources/list-student-status.controller'

@Module({
  imports: [AuthenticationUseCasesModule, LocationUseCasesModule, ResourceUseCasesModule],
  controllers: [
    SessionController,
    CreateRegionController,
    ListRegionsController,
    ListCitiesController,
    CreateCityController,
    ListClassOptionsController,
    ListClassStatusController,
    ListStudentStatusController,
    ListHighshoolStatusController,
  ],
})
export class PresentationsModule {}
