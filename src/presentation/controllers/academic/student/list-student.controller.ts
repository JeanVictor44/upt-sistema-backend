import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListStudentsUseCase } from '@root/domain/academic/applications/use-cases/student/list-students.use-case'
import {
  ListStudentsResponseSwaggerDto,
  ListStudentsSwaggerDto,
} from '@root/presentation/swagger/academic/docs/student/list-student-swagger.dto'
import { StudentViewModel } from '@root/presentation/view-model/student.view-model'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ListStudentsController {
  constructor(private listStudents: ListStudentsUseCase) {}

  @ApiBearerAuth()
  @Get('/students')
  @HttpCode(200)
  @ListStudentsSwaggerDto()
  async handle(): Promise<ListStudentsResponseSwaggerDto> {
    const result = await this.listStudents.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(StudentViewModel.toHttp),
    }
  }
}
