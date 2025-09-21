import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { CreateTeachingPlaceUseCase } from '@root/domain/location/applications/use-cases/create-teaching-place.use-case'
import {
  CreateTeachingPlaceBodySwaggerDto,
  CreateTeachingPlaceResponseSwaggerDto,
  CreateTeachingPlaceSwaggerDto,
} from '@root/presentation/swagger/location/docs/create-teaching-place-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class CreateTeachingPlaceController {
  constructor(private createTeachingPlace: CreateTeachingPlaceUseCase) {}

  @ApiBearerAuth()
  @Post('/teaching-place')
  @HttpCode(201)
  @CreateTeachingPlaceSwaggerDto()
  async handle(@Body() body: CreateTeachingPlaceBodySwaggerDto): Promise<CreateTeachingPlaceResponseSwaggerDto> {
    const { name, neighborhoodId } = body

    const result = await this.createTeachingPlace.execute({ name, neighborhoodId })

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
      description: 'Teaching place created successfully',
    }
  }
}
