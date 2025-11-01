import { BadRequestException, Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListStudentsEnrollmentClassEditionUseCase } from '@root/domain/academic/applications/use-cases/enrollment/list-students-enrollment-class-edition.use-case'
import {
  ListStudentsEnrollmentClassEditionResponseSwaggerDto,
  ListStudentsEnrollmentClassEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/enrollment/list-students-enrollment-class-edition-swagger.dto'
import { StudentEnrollmentViewModel } from '@root/presentation/view-model/student-enrollment.view-model'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ListStudentsEnrollmentClassEditionController {
  constructor(private listStudentsEnrollment: ListStudentsEnrollmentClassEditionUseCase) {}

  @ApiBearerAuth()
  @Get('/enrollments/class-editions/:id/students')
  @HttpCode(200)
  @ListStudentsEnrollmentClassEditionSwaggerDto()
  async handle(@Param('id') classEditionId: number): Promise<ListStudentsEnrollmentClassEditionResponseSwaggerDto> {
    const result = await this.listStudentsEnrollment.execute({
      classEditionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(StudentEnrollmentViewModel.toHttp),
    }
  }
}
