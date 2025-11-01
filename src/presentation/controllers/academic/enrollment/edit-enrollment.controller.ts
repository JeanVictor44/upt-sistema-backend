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
import { EditEnrollmentUseCase } from '@root/domain/academic/applications/use-cases/enrollment/edit-enrollment.use-case'
import {
  EditEnrollmentBodySwaggerDto,
  EditEnrollmentResponseSwaggerDto,
  EditEnrollmentSwaggerDto,
} from '@root/presentation/swagger/academic/docs/enrollment/edit-enrollment-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditEnrollmentController {
  constructor(private editEnrollment: EditEnrollmentUseCase) {}

  @ApiBearerAuth()
  @Put('/enrollments/:id')
  @HttpCode(201)
  @EditEnrollmentSwaggerDto()
  async handle(
    @Body() body: EditEnrollmentBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditEnrollmentResponseSwaggerDto> {
    const { isExempt, statusId } = body

    const result = await this.editEnrollment.execute({
      enrollmentId: id,
      isExempt,
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
      description: 'Enrollment edited successfully',
    }
  }
}
