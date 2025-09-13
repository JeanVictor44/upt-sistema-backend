import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListStudentStatusesUseCase } from '@root/domain/resource/applications/use-cases/list-student-statuses.use-case'
import { StudentStatus } from '@root/domain/resource/enterprise/interfaces/student-statuses'
import {
  ListStudenStatusesResponseSwaggerDto,
  ListStudentStatusesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-student-statuses-swagger'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListStudentStatusController {
  constructor(private listStudentStatuses: ListStudentStatusesUseCase) {}

  @ApiBearerAuth()
  @Get('/student-status')
  @HttpCode(200)
  @ListStudentStatusesSwaggerDto()
  async handle(): Promise<ListStudenStatusesResponseSwaggerDto> {
    const result = await this.listStudentStatuses.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<StudentStatus>(resource)),
    }
  }
}
