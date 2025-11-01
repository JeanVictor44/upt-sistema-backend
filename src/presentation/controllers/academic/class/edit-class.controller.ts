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
import { EditClassUseCase } from '@root/domain/academic/applications/use-cases/class/edit-class.use-case'
import {
  EditClassBodySwaggerDto,
  EditClassResponseSwaggerDto,
  EditClassSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class/edit-class-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditClassController {
  constructor(private editClass: EditClassUseCase) {}

  @ApiBearerAuth()
  @Post('/classes/:id')
  @HttpCode(201)
  @EditClassSwaggerDto()
  async handle(@Body() body: EditClassBodySwaggerDto, @Param('id') id: number): Promise<EditClassResponseSwaggerDto> {
    const { name, optionId, shiftId, statusId, teachingPlaceId } = body

    const result = await this.editClass.execute({ name, id, optionId, shiftId, statusId, teachingPlaceId })

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
      description: 'Class edited successfully',
    }
  }
}
