import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateNeighborhoodUseCase } from '@root/domain/location/applications/use-cases/create-neighborhood.use-case'
import {
  CreateNeighborhoodBodySwaggerDto,
  CreateNeighborhoodResponseSwaggerDto,
  CreateNeighborhoodSwaggerDto,
} from '@root/presentation/swagger/location/docs/create-neighborhood.dto'
import { mapDomainErrors } from '@root/shared/utils/mapDomainErrors'

const errorMap = mapDomainErrors([[[ResourceAlreadyExistsError], ConflictException]])

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class CreateNeighborhoodController {
  constructor(private createNeighborhood: CreateNeighborhoodUseCase) {}

  @ApiBearerAuth()
  @Post('/neighborhoods')
  @HttpCode(201)
  @CreateNeighborhoodSwaggerDto()
  async handle(@Body() body: CreateNeighborhoodBodySwaggerDto): Promise<CreateNeighborhoodResponseSwaggerDto> {
    const { name, cityId, regionId } = body

    const result = await this.createNeighborhood.execute({ name, cityId, regionId })

    if (result.isLeft()) {
      const error = result.value
      const handler = errorMap.get(error.constructor as new (...args: any[]) => Error)
      if (handler) throw handler(error)
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      description: 'Neighborhood created successfully',
    }
  }
}
