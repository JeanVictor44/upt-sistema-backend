import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { EditTeachingPlaceUseCase } from '@root/domain/location/applications/use-cases/teaching-place/edit-teaching-place.use-case'
import {
  EditTeachingPlaceBodySwaggerDto,
  EditTeachingPlaceResponseSwaggerDto,
  EditTeachingPlaceSwaggerDto,
} from '@root/presentation/swagger/location/docs/teaching-place/edit-teaching-place-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class EditTeachingPlaceController {
  constructor(private editTeachingPlace: EditTeachingPlaceUseCase) {}

  @ApiBearerAuth()
  @Post('/teaching-places/:id')
  @HttpCode(201)
  @EditTeachingPlaceSwaggerDto()
  async handle(
    @Body() body: EditTeachingPlaceBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditTeachingPlaceResponseSwaggerDto> {
    const { name, neighborhoodId, propertyLocationCategoryId, traditionalCommunityName } = body

    const result = await this.editTeachingPlace.execute({
      name,
      neighborhoodId,
      id,
      propertyLocationCategoryId,
      traditionalCommunityName,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(result.value.name, { description: result.value.message })
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Teaching place edited successfully',
    }
  }
}
