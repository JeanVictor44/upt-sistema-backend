import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteRegionUseCase } from '@root/domain/location/applications/use-cases/delete-region.use-case'
import {
  DeleteRegionResponseSwaggerDto,
  DeleteRegionSwaggerDto,
} from '@root/presentation/swagger/location/docs/delete-region-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class DeleteRegionController {
  constructor(private deleteRegion: DeleteRegionUseCase) {}

  @ApiBearerAuth()
  @Delete('/regions/:id')
  @HttpCode(201)
  @DeleteRegionSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteRegionResponseSwaggerDto> {
    const result = await this.deleteRegion.execute({ id })

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
      description: 'Region deleted successfully',
    }
  }
}
