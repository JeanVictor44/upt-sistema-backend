import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListHighschoolStatusesUseCase } from '@root/domain/resource/applications/use-cases/list-highschool-statuses.use-case'
import {
  ListHighschoolStatusesResponseSwaggerDto,
  ListHighschoolStatusesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-highschool-statuses-swagger'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

import { HighschoolStatus } from '@domain/resource/enterprise/interfaces/highschool-statuses'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListHighshoolStatusController {
  constructor(private listHighschoolStatuses: ListHighschoolStatusesUseCase) {}

  @ApiBearerAuth()
  @Get('/highschool-status')
  @HttpCode(200)
  @ListHighschoolStatusesSwaggerDto()
  async handle(): Promise<ListHighschoolStatusesResponseSwaggerDto> {
    const result = await this.listHighschoolStatuses.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<HighschoolStatus>(resource)),
    }
  }
}
