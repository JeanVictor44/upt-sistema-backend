import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListClassOptionsUseCase } from '@root/domain/resource/applications/use-cases/list-class-options.use-case'
import { ClassOption } from '@root/domain/resource/enterprise/interfaces/class-options'
import {
  ListClassOptionsResponseSwaggerDto,
  ListClassOptionSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-class-options-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListClassOptionsController {
  constructor(private listClassOptions: ListClassOptionsUseCase) {}

  @ApiBearerAuth()
  @Get('/class-options')
  @HttpCode(200)
  @ListClassOptionSwaggerDto()
  async handle(): Promise<ListClassOptionsResponseSwaggerDto> {
    const result = await this.listClassOptions.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<ClassOption>(resource)),
    }
  }
}
