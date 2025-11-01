import { BadRequestException, Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { DeleteClassUseCase } from '@root/domain/academic/applications/use-cases/class/delete-class.use-case'
import {
  DeleteClassResponseSwaggerDto,
  DeleteClassSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class/delete-class-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class DeleteClassController {
  constructor(private deleteClass: DeleteClassUseCase) {}

  @ApiBearerAuth()
  @Delete('/classes/:id')
  @HttpCode(201)
  @DeleteClassSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteClassResponseSwaggerDto> {
    const result = await this.deleteClass.execute({ id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Class deleted successfully',
    }
  }
}
