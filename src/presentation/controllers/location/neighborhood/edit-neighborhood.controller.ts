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
import { EditNeighborhoodUseCase } from '@root/domain/location/applications/use-cases/neighborhood/edit-neighborhood.use-case'
import {
  EditNeighorhoodBodySwaggerDto,
  EditNeighorhoodResponseSwaggerDto,
  EditNeighorhoodSwaggerDto,
} from '@root/presentation/swagger/location/docs/neighborhood/edit-neighborhood-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class EditNeighborhoodController {
  constructor(private editNeighborhood: EditNeighborhoodUseCase) {}

  @ApiBearerAuth()
  @Post('/neighborhoods/:id')
  @HttpCode(201)
  @EditNeighorhoodSwaggerDto()
  async handle(
    @Body() body: EditNeighorhoodBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditNeighorhoodResponseSwaggerDto> {
    const { name, cityId, regionId } = body

    const result = await this.editNeighborhood.execute({ name, id, cityId, regionId })

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
      description: 'Neighborhood edited successfully',
    }
  }
}
