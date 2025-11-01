import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteTeachingPlaceUseCase } from '@root/domain/location/applications/use-cases/teaching-place/delete-teaching-place.use-case'
import {
  DeleteTeachingPlaceResponseSwaggerDto,
  DeleteTeachingPlaceSwaggerDto,
} from '@root/presentation/swagger/location/docs/teaching-place/delete-teaching-place-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class DeleteTeachingPlaceController {
  constructor(private deleteTeachingPlace: DeleteTeachingPlaceUseCase) {}

  @ApiBearerAuth()
  @Delete('/teaching-places/:id')
  @HttpCode(201)
  @DeleteTeachingPlaceSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteTeachingPlaceResponseSwaggerDto> {
    const result = await this.deleteTeachingPlace.execute({ id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Teaching Place deleted successfully',
    }
  }
}
