import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateCityUseCase } from '@root/domain/location/applications/use-cases/create-city.use-case'
import {
  CreateCityBodySwaggerDto,
  CreateCityResponseSwaggerDto,
  CreateCitySwaggerDto,
} from '@root/presentation/swagger/location/docs/create-city-swagger.dtos'
import { mapDomainErrors } from '@root/shared/utils/mapDomainErrors'

const errorMap = mapDomainErrors([[[ResourceAlreadyExistsError], ConflictException]])

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class CreateCityController {
  constructor(private createCity: CreateCityUseCase) {}

  @ApiBearerAuth()
  @Post('/city')
  @HttpCode(201)
  @CreateCitySwaggerDto()
  async handle(@Body() body: CreateCityBodySwaggerDto): Promise<CreateCityResponseSwaggerDto> {
    const { name } = body

    const result = await this.createCity.execute({ name })

    if (result.isLeft()) {
      const error = result.value
      const handler = errorMap.get(error.constructor as new (...args: any[]) => Error)
      if (handler) throw handler(error)
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      description: 'City created successfully',
    }
  }
}
