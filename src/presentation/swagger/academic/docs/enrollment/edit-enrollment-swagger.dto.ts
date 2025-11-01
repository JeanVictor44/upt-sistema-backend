import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsBoolean, IsNumber } from 'class-validator'

export class EditEnrollmentBodySwaggerDto {
  @ApiProperty({
    description: 'ID of the Status',
    example: 1,
  })
  @IsNumber()
  statusId: number

  @ApiProperty({
    description: 'Indicates if the enrollment is exempted from fees',
    example: false,
    type: Boolean,
  })
  @IsBoolean()
  isExempt: boolean
}

const EDITED_DESCRIPTION = 'Enrollment edited successfully'
export const EditEnrollmentSwaggerDto = () => {
  const name = 'EditEnrollment'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editEnrollment',
      summary: 'Editar a matrícula de um estudante em uma edição de turma',
      description: 'Permite editar a matrícula de um estudante em uma edição de turma específica.',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditEnrollmentResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
