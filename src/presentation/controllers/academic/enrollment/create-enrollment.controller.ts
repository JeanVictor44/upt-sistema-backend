import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateEnrollmentUseCase } from '@root/domain/academic/applications/use-cases/enrollment/create-enrollment.use-case'
import {
  CreateEnrollmentBodySwaggerDto,
  CreateEnrollmentResponseSwaggerDto,
  CreateEnrollmentSwaggerDto,
} from '@root/presentation/swagger/academic/docs/enrollment/create-enrollment-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class CreateEnrollmentController {
  constructor(private createEnrollment: CreateEnrollmentUseCase) {}

  @ApiBearerAuth()
  @Post('/enrollment')
  @HttpCode(201)
  @CreateEnrollmentSwaggerDto()
  async handle(@Body() body: CreateEnrollmentBodySwaggerDto): Promise<CreateEnrollmentResponseSwaggerDto> {
    const { classEditionId, studentId } = body

    const result = await this.createEnrollment.execute({ classEditionId, studentId })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(result.value.name, { description: result.value.message })

        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Enrollment created successfully',
    }
  }
}
