import { Module } from '@nestjs/common'
import { UserRolesRepository } from '@root/domain/authentication/applications/repositories/user-role.repository'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'
import { EditionRepository } from '@root/domain/edition/applications/repositories/edition-repository'
import { CityRepository } from '@root/domain/location/applications/repositories/city.repository'
import { NeighborhoodQueryRepository } from '@root/domain/location/applications/repositories/neighborhood-query.repository'
import { NeighborhoodRepository } from '@root/domain/location/applications/repositories/neighborhood.repository'
import { RegionRepository } from '@root/domain/location/applications/repositories/region.repository'
import { TeachingPlaceQueryRepository } from '@root/domain/location/applications/repositories/teaching-place-query.repository'
import { TeachingPlaceRepository } from '@root/domain/location/applications/repositories/teaching-place.repository'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'

import { DrizzleModule } from '@infra/database/drizzle/drizzle.module'

import { DrizzleCityRepository } from './drizzle/repositories/drizzle-city.repository'
import { DrizzleEditionRepository } from './drizzle/repositories/drizzle-edition.repository'
import { DrizzleNeighborhoodQueryRepository } from './drizzle/repositories/drizzle-neighborhood-query.repository'
import { DrizzleNeighborhoodRepository } from './drizzle/repositories/drizzle-neighborhood.repository'
import { DrizzleRegionsRepository } from './drizzle/repositories/drizzle-regions.repository'
import { DrizzleResourcesRepository } from './drizzle/repositories/drizzle-resources.repository'
import { DrizzleTeachingPlaceQueryRepository } from './drizzle/repositories/drizzle-teaching-place-query.repository'
import { DrizzleTeachingPlaceRepository } from './drizzle/repositories/drizzle-teaching-place.repository'
import { DrizzleUserRole } from './drizzle/repositories/drizzle-user-role.repository'
import { DrizzleUsersRepository } from './drizzle/repositories/drizzle-users.repository'

@Module({
  imports: [DrizzleModule],
  providers: [
    { useClass: DrizzleUsersRepository, provide: UsersRepository },
    { useClass: DrizzleRegionsRepository, provide: RegionRepository },
    { useClass: DrizzleCityRepository, provide: CityRepository },
    { useClass: DrizzleResourcesRepository, provide: ResourceRepository },
    { useClass: DrizzleNeighborhoodRepository, provide: NeighborhoodRepository },
    { useClass: DrizzleNeighborhoodQueryRepository, provide: NeighborhoodQueryRepository },
    { useClass: DrizzleTeachingPlaceRepository, provide: TeachingPlaceRepository },
    { useClass: DrizzleTeachingPlaceQueryRepository, provide: TeachingPlaceQueryRepository },
    { useClass: DrizzleEditionRepository, provide: EditionRepository },
    { useClass: DrizzleUserRole, provide: UserRolesRepository },
  ],
  exports: [
    UsersRepository,
    RegionRepository,
    ResourceRepository,
    CityRepository,
    NeighborhoodRepository,
    NeighborhoodQueryRepository,
    TeachingPlaceRepository,
    TeachingPlaceQueryRepository,
    EditionRepository,
    UserRolesRepository,
  ],
})
export class DatabaseModule {}
