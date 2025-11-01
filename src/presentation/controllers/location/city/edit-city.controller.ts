import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { EditCityUseCase } from '@root/domain/location/applications/use-cases/city/edit-city.use-case'
import {
  EditCityBodySwaggerDto,
  EditCityResponseSwaggerDto,
  EditCitySwaggerDto,
} from '@root/presentation/swagger/location/docs/city/edit-city-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class EditCityController {
  constructor(private editCity: EditCityUseCase) {}

  @ApiBearerAuth()
  @Put('/cities/:id')
  @HttpCode(201)
  @EditCitySwaggerDto()
  async handle(@Body() body: EditCityBodySwaggerDto, @Param('id') id: number): Promise<EditCityResponseSwaggerDto> {
    const { name } = body

    const result = await this.editCity.execute({ name, id })

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
      description: 'City edited successfully',
    }
  }
}
