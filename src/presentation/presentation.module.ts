import { Module } from '@nestjs/common'
import { AcademicUseCasesModule } from '@root/domain/academic/applications/use-cases/academic-use-case.module'
import { AnalyticsUseCasesModule } from '@root/domain/analytics/applications/use-cases/analytics-use-case.module'
import { AuthenticationUseCasesModule } from '@root/domain/authentication/applications/use-cases/authentication-use-case.module'
import { LocationUseCasesModule } from '@root/domain/location/applications/use-cases/location-use-case.module'
import { ResourceUseCasesModule } from '@root/domain/resource/applications/use-cases/resource-use-case.module'

import { DrizzleModule } from '@infra/database/drizzle/drizzle.module'

import { CreateClassEditionController } from './controllers/academic/class-edition/create-class-edition.controller'
import { DeleteClassEditionController } from './controllers/academic/class-edition/delete-class-edition.controller'
import { EditClassEditionController } from './controllers/academic/class-edition/edit-class-edition.controller'
import { ListClassEditionsController } from './controllers/academic/class-edition/list-class-edition.controller'
import { CreateEditionController } from './controllers/academic/edition/create-edition.controller'
import { DeleteEditionController } from './controllers/academic/edition/delete-edition.controller'
import { EditEditionController } from './controllers/academic/edition/edit-edition.controller'
import { ListEditionsController } from './controllers/academic/edition/list-editions.controller'
import { CreateEnrollmentController } from './controllers/academic/enrollment/create-enrollment.controller'
import { EditEnrollmentController } from './controllers/academic/enrollment/edit-enrollment.controller'
import { ExportEnrollmentReportController } from './controllers/academic/enrollment/export-enrollment-report.controller'
import { ListStudentsEnrollmentClassEditionController } from './controllers/academic/enrollment/list-students-enrollment-class-edition.controller'
import { EditStudentAttendanceController } from './controllers/academic/student-attendance/edit-student-attendance.controller'
import { CreateStudentController } from './controllers/academic/student/create-student.controller'
import { DeleteStudentController } from './controllers/academic/student/delete-student.controller'
import { EditStudentController } from './controllers/academic/student/edit-student.controller'
import { ListStudentsController } from './controllers/academic/student/list-student.controller'
import { FindBigNumbersController } from './controllers/analytics/find-big-numbers.controller'
import { FindDistributionByEthnicityController } from './controllers/analytics/find-distribution-by-ethnicity.controller'
import { FindDistributionByGenderIdentityController } from './controllers/analytics/find-distribution-by-gender-identity.controller'
import { FindDistributionByPropertyLocationController } from './controllers/analytics/find-distribution-by-property-location.controller'
import { FindDistributionByShiftController } from './controllers/analytics/find-distribution-by-shift.controller'
import { FindEnrollmentEvolutionController } from './controllers/analytics/find-enrollment-evolution.controller'
import { FindTopClassEditionsEnrollmentController } from './controllers/analytics/find-top-class-editions-enrollment.controller'
import { CreateUserRoleController } from './controllers/authentication/create-user-role.controller'
import { CreateUserController } from './controllers/authentication/create-user.controller'
import { EditUserRoleController } from './controllers/authentication/edit-user-role.controller'
import { EditUserController } from './controllers/authentication/edit-user.controller'
import { ListeRegionManagersController } from './controllers/authentication/list-region-managers.controller'
import { ListeUsersController } from './controllers/authentication/list-users.controller'
import { SessionController } from './controllers/authentication/session.controller'
import { CreateAddressController } from './controllers/location/address/create-address.controller'
import { EditAddressController } from './controllers/location/address/edit-address.controller'
import { CreateCityController } from './controllers/location/city/create-city.controller'
import { DeleteCityController } from './controllers/location/city/delete-city.controller'
import { EditCityController } from './controllers/location/city/edit-city.controller'
import { ListCitiesController } from './controllers/location/city/list-cities.controller'
import { CreateNeighborhoodController } from './controllers/location/neighborhood/create-neighborhood.controller'
import { DeletNeighborhoodController } from './controllers/location/neighborhood/delete-neighborhood.controller'
import { EditNeighborhoodController } from './controllers/location/neighborhood/edit-neighborhood.controller'
import { ListNeighborhoodsController } from './controllers/location/neighborhood/list-neighborhoods.controller'
import { CreateRegionController } from './controllers/location/region/create-region.controller'
import { DeleteRegionController } from './controllers/location/region/delete-region.controller'
import { EdtiRegionController } from './controllers/location/region/edit-region.controller'
import { ListRegionsController } from './controllers/location/region/list-regions.controller'
import { CreateTeachingPlaceController } from './controllers/location/teaching-place/create-teaching-place.controller'
import { DeleteTeachingPlaceController } from './controllers/location/teaching-place/delete-teaching-place.controller'
import { EditTeachingPlaceController } from './controllers/location/teaching-place/edit-teaching-place.controller'
import { ListTeachingPlaceController } from './controllers/location/teaching-place/list-teaching-place.controller'
import { ListClassOptionsController } from './controllers/resources/list-class-options.controller'
import { ListClassStatusController } from './controllers/resources/list-class-status.controller'
import { ListEnrollmentStatusController } from './controllers/resources/list-enrollment-status.controller'
import { ListEthnicitiesController } from './controllers/resources/list-ethnicities.controller'
import { ListGendersController } from './controllers/resources/list-genders.controller'
import { ListHighshoolStatusController } from './controllers/resources/list-highshool.controller'
import { ListPropertyLocationsController } from './controllers/resources/list-property-location-categories.controller'
import { ListRolesController } from './controllers/resources/list-roles.controller'
import { ListShiftsController } from './controllers/resources/list-shifts.controller'
import { ExcelGeneratorService } from './services/excel-generator.service'

@Module({
  imports: [
    DrizzleModule,
    AuthenticationUseCasesModule,
    LocationUseCasesModule,
    ResourceUseCasesModule,
    AcademicUseCasesModule,
    AnalyticsUseCasesModule,
  ],
  providers: [ExcelGeneratorService],
  controllers: [
    ListClassStatusController,
    ListClassOptionsController,
    ListEnrollmentStatusController,
    ListHighshoolStatusController,
    ListEthnicitiesController,
    ListGendersController,
    ListPropertyLocationsController,
    SessionController,
    CreateUserRoleController,
    CreateUserController,
    CreateRegionController,
    ListRegionsController,
    ListCitiesController,
    CreateCityController,
    EdtiRegionController,
    EditCityController,
    CreateNeighborhoodController,
    ListNeighborhoodsController,
    CreateTeachingPlaceController,
    ListTeachingPlaceController,
    CreateEditionController,
    ListEditionsController,
    DeleteCityController,
    DeleteRegionController,
    DeletNeighborhoodController,
    EditNeighborhoodController,
    EditTeachingPlaceController,
    DeleteTeachingPlaceController,
    DeleteEditionController,
    EditEditionController,
    ListShiftsController,
    CreateClassEditionController,
    EditClassEditionController,
    DeleteClassEditionController,
    ListClassEditionsController,
    CreateStudentController,
    ListStudentsController,
    EditStudentController,
    DeleteStudentController,
    CreateAddressController,
    EditAddressController,
    CreateEnrollmentController,
    EditEnrollmentController,
    ExportEnrollmentReportController,
    ListStudentsEnrollmentClassEditionController,
    ListeUsersController,
    ListRolesController,
    EditUserController,
    EditUserRoleController,
    ListeRegionManagersController,
    FindBigNumbersController,
    FindDistributionByShiftController,
    FindTopClassEditionsEnrollmentController,
    FindDistributionByGenderIdentityController,
    FindDistributionByEthnicityController,
    FindDistributionByPropertyLocationController,
    FindEnrollmentEvolutionController,
    EditStudentAttendanceController,
  ],
})
export class PresentationsModule {}
