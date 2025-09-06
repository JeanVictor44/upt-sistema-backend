import { Module } from '@nestjs/common'
import { AuthenticationUseCasesModule } from '@root/domain/authentication/applications/use-cases/authentication-use-case.module'
import { LocationUseCasesModule } from '@root/domain/location/applications/use-cases/location-use-case.module'

import { SessionController } from './controllers/authentication/session.controller'
import { CreateRegionController } from './controllers/location/create-region.controller'
import { ListRegionsController } from './controllers/location/list-regions.controller'

@Module({
  imports: [AuthenticationUseCasesModule, LocationUseCasesModule],
  controllers: [SessionController, CreateRegionController, ListRegionsController],
})
export class PresentationsModule {}
