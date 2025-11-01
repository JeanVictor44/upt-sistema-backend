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
import { EditStudentUseCase } from '@root/domain/academic/applications/use-cases/student/edit-student.use-case'
import {
  EditStudentBodySwaggerDto,
  EditStudentResponseSwaggerDto,
  EditStudentSwaggerDto,
} from '@root/presentation/swagger/academic/docs/student/edit-student-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditStudentController {
  constructor(private editStudent: EditStudentUseCase) {}

  @ApiBearerAuth()
  @Put('/students/:id')
  @HttpCode(201)
  @EditStudentSwaggerDto()
  async handle(
    @Body() body: EditStudentBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditStudentResponseSwaggerDto> {
    const {
      addressId,
      cpf,
      dateBirth,
      email,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
      name,
      telephone,
      rg,
      socialName,
    } = body

    const result = await this.editStudent.execute({
      addressId,
      cpf,
      dateBirth,
      email,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
      name,
      telephone,
      rg,
      socialName,
      id,
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
      description: 'Student edited successfully',
    }
  }
}
