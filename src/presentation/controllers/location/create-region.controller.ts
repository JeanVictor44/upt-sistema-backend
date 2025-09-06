import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateRegionUseCase } from '@root/domain/location/applications/use-cases/create-region.use-case'
import {
  CreateRegionBodySwaggerDto,
  CreateRegionResponseSwaggerDto,
  CreateRegionSwaggerDto,
} from '@root/presentation/swagger/location/docs/create-region-swagger.dto'
import { mapDomainErrors } from '@root/shared/utils/mapDomainErrors'

const errorMap = mapDomainErrors([[[ResourceAlreadyExistsError], ConflictException]])

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class CreateRegionController {
  constructor(private createRegion: CreateRegionUseCase) {}

  @ApiBearerAuth()
  @Post('/region')
  @HttpCode(201)
  @CreateRegionSwaggerDto()
  async handle(@Body() body: CreateRegionBodySwaggerDto): Promise<CreateRegionResponseSwaggerDto> {
    const { name } = body

    const result = await this.createRegion.execute({ name })

    if (result.isLeft()) {
      const error = result.value
      const handler = errorMap.get(error.constructor as new (...args: any[]) => Error)
      if (handler) throw handler(error)
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      description: 'Region created successfully',
    }
  }
}
