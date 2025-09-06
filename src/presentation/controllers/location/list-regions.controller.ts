import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListRegionsUseCase } from '@root/domain/location/applications/use-cases/list-regions.use-case'
import {
  ListRegionsResponseSwaggerDto,
  ListRegionsSwaggerDto,
} from '@root/presentation/swagger/location/docs/list-region-swagger.dto'
import { RegionViewModel } from '@root/presentation/view-model/region.view-model'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class ListRegionsController {
  constructor(private listRegions: ListRegionsUseCase) {}

  @ApiBearerAuth()
  @Get('/region')
  @HttpCode(200)
  @ListRegionsSwaggerDto()
  async handle(): Promise<ListRegionsResponseSwaggerDto> {
    const result = await this.listRegions.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(RegionViewModel.toHttp),
    }
  }
}
