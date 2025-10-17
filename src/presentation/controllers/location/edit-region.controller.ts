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
import { EditRegionUseCase } from '@root/domain/location/applications/use-cases/edit-region.use-case'
import {
  EditRegionBodySwaggerDto,
  EditRegionResponseSwaggerDto,
  EditRegionSwaggerDto,
} from '@root/presentation/swagger/location/docs/edit-region-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class EdtiRegionController {
  constructor(private editRegion: EditRegionUseCase) {}

  @ApiBearerAuth()
  @Put('/regions/:id')
  @HttpCode(201)
  @EditRegionSwaggerDto()
  async handle(@Body() body: EditRegionBodySwaggerDto, @Param('id') id: number): Promise<EditRegionResponseSwaggerDto> {
    const { name } = body

    const result = await this.editRegion.execute({ name, id })

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
      description: 'Region edited successfully',
    }
  }
}
