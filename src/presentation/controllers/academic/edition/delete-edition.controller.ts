import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceConflictError } from '@root/core/errors/errors/resource-conflict-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteEditionUseCase } from '@root/domain/academic/applications/use-cases/edition/delete-edition.use-case'
import {
  DeleteEditionResponseSwaggerDto,
  DeleteEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/edition/delete-edition-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class DeleteEditionController {
  constructor(private deleteEdition: DeleteEditionUseCase) {}

  @ApiBearerAuth()
  @Delete('/editions/:id')
  @HttpCode(201)
  @DeleteEditionSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteEditionResponseSwaggerDto> {
    const result = await this.deleteEdition.execute({ id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.name, { description: result.value.message })
        case ResourceConflictError:
          throw new ConflictException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Edition deleted successfully',
    }
  }
}
