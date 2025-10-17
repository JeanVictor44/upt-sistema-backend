import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteCityUseCase } from '@root/domain/location/applications/use-cases/delete-city-use-case'
import {
  DeleteCityResponseSwaggerDto,
  DeleteCitySwaggerDto,
} from '@root/presentation/swagger/location/docs/delete-city-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class DeleteCityController {
  constructor(private deleteCity: DeleteCityUseCase) {}

  @ApiBearerAuth()
  @Delete('/cities/:id')
  @HttpCode(201)
  @DeleteCitySwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteCityResponseSwaggerDto> {
    const result = await this.deleteCity.execute({ id })

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
      description: 'City deleted successfully',
    }
  }
}
