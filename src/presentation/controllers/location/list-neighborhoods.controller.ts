import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListNeighborhoodUseCase } from '@root/domain/location/applications/use-cases/list-neighborhood.use-case'
import {
  ListNeighborhoodsResponseSwaggerDto,
  ListNeighborhoodsSwaggerDto,
} from '@root/presentation/swagger/location/docs/list-neighborhood-swagger.dto'
import { NeighborhoodViewModel } from '@root/presentation/view-model/neighborhood.view-model'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class ListNeighborhoodsController {
  constructor(private listNeighborhoods: ListNeighborhoodUseCase) {}

  @ApiBearerAuth()
  @Get('/neighborhoods')
  @HttpCode(200)
  @ListNeighborhoodsSwaggerDto()
  async handle(): Promise<ListNeighborhoodsResponseSwaggerDto> {
    const result = await this.listNeighborhoods.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(NeighborhoodViewModel.toHttp),
    }
  }
}
