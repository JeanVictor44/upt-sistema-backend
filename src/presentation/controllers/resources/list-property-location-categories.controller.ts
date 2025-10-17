import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListPropertyLocationsUseCase } from '@root/domain/resource/applications/use-cases/list-property-location-category.user-case'
import { PropertyLocationCategory } from '@root/domain/resource/enterprise/interfaces/property-location-category'
import {
  ListPropertyLocationCategoryResponseSwaggerDto,
  ListPropertyLocationSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-property-location-category-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListPropertyLocationsController {
  constructor(private listPropertyLocations: ListPropertyLocationsUseCase) {}

  @ApiBearerAuth()
  @Get('/property-location-categories')
  @HttpCode(200)
  @ListPropertyLocationSwaggerDto()
  async handle(): Promise<ListPropertyLocationCategoryResponseSwaggerDto> {
    const result = await this.listPropertyLocations.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<PropertyLocationCategory>(resource)),
    }
  }
}
