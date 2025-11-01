import { Module } from '@nestjs/common'
import { ClassEditionQueryRepository } from '@root/domain/academic/applications/repositories/class-edition-query-repository'
import { ClassEditionRepository } from '@root/domain/academic/applications/repositories/class-edition-repository'
import { ClassQueryRepository } from '@root/domain/academic/applications/repositories/class-query-repository'
import { ClassRepository } from '@root/domain/academic/applications/repositories/class-repository'
import { EditionRepository } from '@root/domain/academic/applications/repositories/edition-repository'
import { EnrollmentRepository } from '@root/domain/academic/applications/repositories/enrollment.repository'
import { StudentQueryRepository } from '@root/domain/academic/applications/repositories/student-query-repository'
import { StudentRepository } from '@root/domain/academic/applications/repositories/student-repository'
import { UserRolesRepository } from '@root/domain/authentication/applications/repositories/user-role.repository'
import { UsersRepository } from '@root/domain/authentication/applications/repositories/users.repository'
import { AddressRepository } from '@root/domain/location/applications/repositories/address.repository'
import { CityRepository } from '@root/domain/location/applications/repositories/city.repository'
import { NeighborhoodQueryRepository } from '@root/domain/location/applications/repositories/neighborhood-query.repository'
import { NeighborhoodRepository } from '@root/domain/location/applications/repositories/neighborhood.repository'
import { RegionRepository } from '@root/domain/location/applications/repositories/region.repository'
import { TeachingPlaceQueryRepository } from '@root/domain/location/applications/repositories/teaching-place-query.repository'
import { TeachingPlaceRepository } from '@root/domain/location/applications/repositories/teaching-place.repository'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'

import { DrizzleModule } from '@infra/database/drizzle/drizzle.module'

import { DrizzleAddressRepository } from './drizzle/repositories/drizzle-address.repository'
import { DrizzleCityRepository } from './drizzle/repositories/drizzle-city.repository'
import { DrizzleClassEditionQueryRepository } from './drizzle/repositories/drizzle-class-edition-query.repository'
import { DrizzleClassEditionRepository } from './drizzle/repositories/drizzle-class-edition.repository'
import { DrizzleClassQueryRepository } from './drizzle/repositories/drizzle-class-query.repository'
import { DrizzleClassRepository } from './drizzle/repositories/drizzle-class.repository'
import { DrizzleEditionRepository } from './drizzle/repositories/drizzle-edition.repository'
import { DrizzleEnrollmentRepository } from './drizzle/repositories/drizzle-enrollment.repository'
import { DrizzleNeighborhoodQueryRepository } from './drizzle/repositories/drizzle-neighborhood-query.repository'
import { DrizzleNeighborhoodRepository } from './drizzle/repositories/drizzle-neighborhood.repository'
import { DrizzleRegionsRepository } from './drizzle/repositories/drizzle-regions.repository'
import { DrizzleResourcesRepository } from './drizzle/repositories/drizzle-resources.repository'
import { DrizzleStudentQueryRepository } from './drizzle/repositories/drizzle-student-query.repository'
import { DrizzleStudentRepository } from './drizzle/repositories/drizzle-student.repository'
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
    { useClass: DrizzleClassRepository, provide: ClassRepository },
    { useClass: DrizzleClassQueryRepository, provide: ClassQueryRepository },
    { useClass: DrizzleClassEditionRepository, provide: ClassEditionRepository },
    { useClass: DrizzleClassEditionQueryRepository, provide: ClassEditionQueryRepository },
    { useClass: DrizzleStudentRepository, provide: StudentRepository },
    { useClass: DrizzleStudentQueryRepository, provide: StudentQueryRepository },
    { useClass: DrizzleAddressRepository, provide: AddressRepository },
    {
      useClass: DrizzleEnrollmentRepository,
      provide: EnrollmentRepository,
    },
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
    ClassQueryRepository,
    ClassRepository,
    ClassEditionRepository,
    ClassEditionQueryRepository,
    StudentRepository,
    StudentQueryRepository,
    AddressRepository,
    EnrollmentRepository,
  ],
})
export class DatabaseModule {}
