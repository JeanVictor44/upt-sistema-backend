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
import { CreateClassUseCase } from '@root/domain/academic/applications/use-cases/class/create-class.use-case'
import {
  CreateClassBodySwaggerDto,
  CreateClassResponseSwaggerDto,
  CreateClassSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class/create-class.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class CreateClassController {
  constructor(private createClass: CreateClassUseCase) {}

  @ApiBearerAuth()
  @Post('/classes')
  @HttpCode(201)
  @CreateClassSwaggerDto()
  async handle(@Body() body: CreateClassBodySwaggerDto): Promise<CreateClassResponseSwaggerDto> {
    const { name, teachingPlaceId } = body

    const result = await this.createClass.execute({ name, teachingPlaceId })

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
      description: 'Class created successfully',
    }
  }
}
