import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateStudentUseCase } from '@root/domain/academic/applications/use-cases/student/create-student.use-case'
import { DeleteAddressUseCase } from '@root/domain/location/applications/use-cases/address/delete-address-use-case'
import {
  CreateStudentBodySwaggerDto,
  CreateStudentResponseSwaggerDto,
  CreateStudentSwaggerDto,
} from '@root/presentation/swagger/academic/docs/student/create-student.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class CreateStudentController {
  constructor(
    private createStudent: CreateStudentUseCase,
    private deleteAddressUseCase: DeleteAddressUseCase,
  ) {}

  @ApiBearerAuth()
  @Post('/students')
  @HttpCode(201)
  @CreateStudentSwaggerDto()
  async handle(@Body() body: CreateStudentBodySwaggerDto): Promise<CreateStudentResponseSwaggerDto> {
    const {
      addressId,
      cpf,
      dateBirth,
      email,
      name,
      rg,
      socialName,
      telephone,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
    } = body

    const result = await this.createStudent.execute({
      addressId,
      cpf,
      dateBirth,
      email,
      name,
      rg,
      socialName,
      telephone,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
    })

    if (result.isLeft()) {
      const error = result.value
      await this.deleteAddressUseCase.execute({ id: addressId })

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      result: result.value,
    }
  }
}
