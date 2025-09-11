import { Module } from '@nestjs/common'
import { AuthenticationUseCasesModule } from '@root/domain/authentication/applications/use-cases/authentication-use-case.module'
import { LocationUseCasesModule } from '@root/domain/location/applications/use-cases/location-use-case.module'
import { ResourceUseCasesModule } from '@root/domain/resource/applications/use-cases/resource-use-case.module'

import { SessionController } from './controllers/authentication/session.controller'
import { CreateRegionController } from './controllers/location/create-region.controller'
import { ListRegionsController } from './controllers/location/list-regions.controller'
import { ListClassOptionsController } from './controllers/resources/list-class-options.controller'

@Module({
  imports: [AuthenticationUseCasesModule, LocationUseCasesModule, ResourceUseCasesModule],
  controllers: [SessionController, CreateRegionController, ListRegionsController, ListClassOptionsController],
})
export class PresentationsModule {}
