import { Module } from '@nestjs/common'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'
import { CityRepository } from '@root/domain/location/applications/repositories/city.repository'
import { RegionRepository } from '@root/domain/location/applications/repositories/region.repository'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'

import { DrizzleModule } from '@infra/database/drizzle/drizzle.module'

import { DrizzleCityRepository } from './drizzle/repositories/drizzle-city.repository'
import { DrizzleRegionsRepository } from './drizzle/repositories/drizzle-regions.repository'
import { DrizzleResourcesRepository } from './drizzle/repositories/drizzle-resources.repository'
import { DrizzleUsersRepository } from './drizzle/repositories/drizzle-users.repository'

@Module({
  imports: [DrizzleModule],
  providers: [
    { useClass: DrizzleUsersRepository, provide: UsersRepository },
    { useClass: DrizzleRegionsRepository, provide: RegionRepository },
    { useClass: DrizzleCityRepository, provide: CityRepository },
    { useClass: DrizzleResourcesRepository, provide: ResourceRepository },
  ],
  exports: [UsersRepository, RegionRepository, ResourceRepository, CityRepository],
})
export class DatabaseModule {}
