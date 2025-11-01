import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { CreateClassEditionUseCase } from './class-edition/create-class-edition.use-case'
import { DeleteClassEditionUseCase } from './class-edition/delete-class-edition.use-case'
import { EditClassEditionUseCase } from './class-edition/edit-class-edition.use-case'
import { ListClassEditionsUseCase } from './class-edition/list-class-editions.use-case'
import { CreateClassUseCase } from './class/create-class.use-case'
import { DeleteClassUseCase } from './class/delete-class.use-case'
import { EditClassUseCase } from './class/edit-class.use-case'
import { ListClassesUseCase } from './class/list-classes.use-case'
import { CreateEditionUseCase } from './edition/create-edition.use-case'
import { DeleteEditionUseCase } from './edition/delete-edition.use-case'
import { EditEditionUseCase } from './edition/edit-edition.use-case'
import { ListEditionsUseCase } from './edition/list-editions.use-case'
import { CreateEnrollmentUseCase } from './enrollment/create-enrollment.use-case'
import { EditEnrollmentUseCase } from './enrollment/edit-enrollment.use-case'
import { ListStudentsEnrollmentClassEditionUseCase } from './enrollment/list-students-enrollment-class-edition.use-case'
import { CreateStudentUseCase } from './student/create-student.use-case'
import { DeleteStudentUseCase } from './student/delete-student.use-case'
import { EditStudentUseCase } from './student/edit-student.use-case'
import { ListStudentsUseCase } from './student/list-students.use-case'

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateEditionUseCase,
    ListEditionsUseCase,
    EditEditionUseCase,
    DeleteEditionUseCase,
    DeleteClassUseCase,
    EditClassUseCase,
    ListClassesUseCase,
    CreateClassUseCase,
    CreateClassEditionUseCase,
    DeleteClassEditionUseCase,
    ListClassEditionsUseCase,
    EditClassEditionUseCase,
    ListStudentsUseCase,
    EditStudentUseCase,
    CreateStudentUseCase,
    DeleteStudentUseCase,
    CreateEnrollmentUseCase,
    EditEnrollmentUseCase,
    ListStudentsEnrollmentClassEditionUseCase,
  ],
  exports: [
    CreateEditionUseCase,
    ListEditionsUseCase,
    EditEditionUseCase,
    DeleteEditionUseCase,
    DeleteClassUseCase,
    EditClassUseCase,
    ListClassesUseCase,
    CreateClassUseCase,
    CreateClassEditionUseCase,
    DeleteClassEditionUseCase,
    ListClassEditionsUseCase,
    EditClassEditionUseCase,
    ListStudentsUseCase,
    EditStudentUseCase,
    CreateStudentUseCase,
    DeleteStudentUseCase,
    CreateEnrollmentUseCase,
    EditEnrollmentUseCase,
    ListStudentsEnrollmentClassEditionUseCase,
  ],
})
export class AcademicUseCasesModule {}
