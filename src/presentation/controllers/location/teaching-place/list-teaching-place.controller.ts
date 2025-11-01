import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListTeachingPlacesUseCase } from '@root/domain/location/applications/use-cases/teaching-place/list-teaching-places.use-case'
import {
  ListTeachingPlacesResponseSwaggerDto,
  ListTeachingPlaceSwaggerDto,
} from '@root/presentation/swagger/location/docs/teaching-place/list-teaching-place.swagger.dto'
import { TeachingPlaceViewModel } from '@root/presentation/view-model/teaching-place.view-model'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class ListTeachingPlaceController {
  constructor(private listTeachingPlace: ListTeachingPlacesUseCase) {}

  @ApiBearerAuth()
  @Get('/teaching-places')
  @HttpCode(200)
  @ListTeachingPlaceSwaggerDto()
  async handle(): Promise<ListTeachingPlacesResponseSwaggerDto> {
    const result = await this.listTeachingPlace.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(TeachingPlaceViewModel.toHttp),
    }
  }
}
