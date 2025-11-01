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
import { DeleteStudentUseCase } from '@root/domain/academic/applications/use-cases/student/delete-student.use-case'
import { DeleteAddressUseCase } from '@root/domain/location/applications/use-cases/address/delete-address-use-case'
import {
  DeleteStudentResponseSwaggerDto,
  DeleteStudentSwaggerDto,
} from '@root/presentation/swagger/academic/docs/student/delete-student-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class DeleteStudentController {
  constructor(
    private deleteStudent: DeleteStudentUseCase,
    private deleteAddress: DeleteAddressUseCase,
  ) {}

  @ApiBearerAuth()
  @Delete('/students/:id')
  @HttpCode(201)
  @DeleteStudentSwaggerDto()
  async handle(@Param('id') id: number): Promise<DeleteStudentResponseSwaggerDto> {
    const result = await this.deleteStudent.execute({ id })

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

    if (result.value.addressId) {
      await this.deleteAddress.execute({ id: result.value.addressId })
    }

    return {
      description: 'Student deleted successfully',
    }
  }
}
