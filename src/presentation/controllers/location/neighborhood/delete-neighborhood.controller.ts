import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteNeighborhoodUseCase } from '@root/domain/location/applications/use-cases/neighborhood/delete-neighborhood.use-case'
import {
  DeleteNeighborhoodResponseSwaggerDto,
  DeleteNeighborhoodSwaggerDto,
} from '@root/presentation/swagger/location/docs/neighborhood/delete-neighborhood-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class DeletNeighborhoodController {
  constructor(private deleteNeighborhood: DeleteNeighborhoodUseCase) {}

  @ApiBearerAuth()
  @Delete('/neighborhoods/:id')
  @HttpCode(201)
  @DeleteNeighborhoodSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteNeighborhoodResponseSwaggerDto> {
    const result = await this.deleteNeighborhood.execute({ id })

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
      description: 'Neighborhood deleted successfully',
    }
  }
}
