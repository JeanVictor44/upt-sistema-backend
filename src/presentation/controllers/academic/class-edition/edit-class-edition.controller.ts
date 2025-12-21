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
import { EditClassEditionUseCase } from '@root/domain/academic/applications/use-cases/class-edition/edit-class-edition.use-case'
import {
  EditClassEditionBodySwaggerDto,
  EditClassEditionResponseSwaggerDto,
  EditClassEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class-edition/edit-class-edition-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditClassEditionController {
  constructor(private editClassEdition: EditClassEditionUseCase) {}

  @ApiBearerAuth()
  @Post('/class-editions/:id')
  @HttpCode(201)
  @EditClassEditionSwaggerDto()
  async handle(
    @Body() body: EditClassEditionBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditClassEditionResponseSwaggerDto> {
    const { teachingPlaceId, editionId, enrolledCount, optionId, shiftId, statusId } = body

    const result = await this.editClassEdition.execute({
      id,
      teachingPlaceId,
      editionId,
      enrolledCount,
      optionId,
      shiftId,
      statusId,
    })

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
      description: 'Class Edition edited successfully',
    }
  }
}
