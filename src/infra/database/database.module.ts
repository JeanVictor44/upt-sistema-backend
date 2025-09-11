import { Module } from '@nestjs/common'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'
import { RegionsRepository } from '@root/domain/location/applications/repositories/RegionsRepository'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'

import { DrizzleModule } from '@infra/database/drizzle/drizzle.module'

import { DrizzleRegionsRepository } from './drizzle/repositories/drizzle-regions.repository'
import { DrizzleResourcesRepository } from './drizzle/repositories/drizzle-resources.repository'
import { DrizzleUsersRepository } from './drizzle/repositories/drizzle-users.repository'

@Module({
  imports: [DrizzleModule],
  providers: [
    { useClass: DrizzleUsersRepository, provide: UsersRepository },
    { useClass: DrizzleRegionsRepository, provide: RegionsRepository },
    { useClass: DrizzleResourcesRepository, provide: ResourceRepository },
  ],
  exports: [UsersRepository, RegionsRepository, ResourceRepository],
})
export class DatabaseModule {}
