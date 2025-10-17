import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListEnrollmentStatusesUseCase } from '@root/domain/resource/applications/use-cases/list-enrollment-statuses.use-case'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import {
  ListEnrollmentResponseSwaggerDto,
  ListEnrollmentStatusesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-enrollment-statuses-swagger'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListEnrollmentStatusController {
  constructor(private listEnrollmentStatuses: ListEnrollmentStatusesUseCase) {}

  @ApiBearerAuth()
  @Get('/enrollment-statuses')
  @HttpCode(200)
  @ListEnrollmentStatusesSwaggerDto()
  async handle(): Promise<ListEnrollmentResponseSwaggerDto> {
    const result = await this.listEnrollmentStatuses.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<EnrollmentStatus>(resource)),
    }
  }
}
