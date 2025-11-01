import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class CreateEnrollmentBodySwaggerDto {
  @ApiProperty({
    description: 'ID of the Student',
    example: 1,
  })
  @IsNumber()
  studentId: number

  @ApiProperty({
    description: 'ID of the Class Edition',
    example: 1,
  })
  @IsNumber()
  classEditionId: number
}

const CREATED_DESCRIPTION = 'Enrollment created successfully'
export const CreateEnrollmentSwaggerDto = () => {
  const name = 'CreateEnrollment'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createEnrollment',
      summary: 'Matricular um estudante em uma edição de turma',
      description: 'Permite a matrícula de um estudante em uma edição de turma específica.',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateEnrollmentResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
