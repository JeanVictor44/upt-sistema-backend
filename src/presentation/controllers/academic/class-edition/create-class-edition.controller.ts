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
import { CreateClassEditionUseCase } from '@root/domain/academic/applications/use-cases/class-edition/create-class-edition.use-case'
import {
  CreateClassEditionBodySwaggerDto,
  CreateClassEditionResponseSwaggerDto,
  CreateClassEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class-edition/create-class-edition.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class CreateClassEditionController {
  constructor(private createClassEdition: CreateClassEditionUseCase) {}

  @ApiBearerAuth()
  @Post('/class-editions')
  @HttpCode(201)
  @CreateClassEditionSwaggerDto()
  async handle(@Body() body: CreateClassEditionBodySwaggerDto): Promise<CreateClassEditionResponseSwaggerDto> {
    const { classId, editionId, enrolledCount } = body

    const result = await this.createClassEdition.execute({ classId, editionId, enrolledCount })

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
      description: 'Class Edition created successfully',
    }
  }
}
