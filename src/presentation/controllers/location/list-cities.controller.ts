import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListCitiesUseCase } from '@root/domain/location/applications/use-cases/list-cities.use-case'
import {
  ListCitiesResponseSwaggerDto,
  ListCitiesSwaggerDto,
} from '@root/presentation/swagger/location/docs/list-city-swagger'
import { CityViewModel } from '@root/presentation/view-model/city.view-model'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class ListCitiesController {
  constructor(private listCities: ListCitiesUseCase) {}

  @ApiBearerAuth()
  @Get('/cities')
  @HttpCode(200)
  @ListCitiesSwaggerDto()
  async handle(): Promise<ListCitiesResponseSwaggerDto> {
    const result = await this.listCities.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(CityViewModel.toHttp),
    }
  }
}
