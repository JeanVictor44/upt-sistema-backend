import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListClassStatusesUseCase } from '@root/domain/resource/applications/use-cases/list-class-statuses.use-case'
import { ClassStatus } from '@root/domain/resource/enterprise/interfaces/class-status'
import {
  ListClassStatusesResponseSwaggerDto,
  ListClassStatusesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-class-statuses-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListClassStatusController {
  constructor(private listClassStatuses: ListClassStatusesUseCase) {}

  @ApiBearerAuth()
  @Get('/class-statuses')
  @HttpCode(200)
  @ListClassStatusesSwaggerDto()
  async handle(): Promise<ListClassStatusesResponseSwaggerDto> {
    const result = await this.listClassStatuses.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<ClassStatus>(resource)),
    }
  }
}
