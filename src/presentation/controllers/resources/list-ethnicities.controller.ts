import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListEthnicitiesUseCase } from '@root/domain/resource/applications/use-cases/list-ethnicity.use-case'
import { Ethnicities } from '@root/domain/resource/enterprise/interfaces/ethnicity'
import {
  ListEthnicitiesResponseSwaggerDto,
  ListEthnicitiesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-ethnicities-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListEthnicitiesController {
  constructor(private listEthnicities: ListEthnicitiesUseCase) {}

  @ApiBearerAuth()
  @Get('/ethnicities')
  @HttpCode(200)
  @ListEthnicitiesSwaggerDto()
  async handle(): Promise<ListEthnicitiesResponseSwaggerDto> {
    const result = await this.listEthnicities.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<Ethnicities>(resource)),
    }
  }
}
