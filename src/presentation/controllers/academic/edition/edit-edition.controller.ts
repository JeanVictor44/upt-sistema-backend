import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { EditEditionUseCase } from '@root/domain/academic/applications/use-cases/edition/edit-edition.use-case'
import {
  EditEditionBodySwaggerDto,
  EditEditionResponseSwaggerDto,
  EditEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/edition/edit-edition-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditEditionController {
  constructor(private editEdition: EditEditionUseCase) {}

  @ApiBearerAuth()
  @Put('/editions/:id')
  @HttpCode(201)
  @EditEditionSwaggerDto()
  async handle(
    @Body() body: EditEditionBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditEditionResponseSwaggerDto> {
    const { year } = body

    const result = await this.editEdition.execute({ year, id })

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
      description: 'Edition edited successfully',
    }
  }
}
