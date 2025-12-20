import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto } from '@utils/swagger-api-response'
import { IsBoolean, IsNumber } from 'class-validator'

export class EditStudentAttendanceBodySwaggerDto {
  @ApiProperty({
    description: 'student attendance month',
    example: 1,
  })
  @IsNumber()
  month: number

  @ApiProperty({
    description: 'student attendance year',
    example: 1,
  })
  @IsNumber()
  year: number

  @ApiProperty({
    description: 'is the student present?',
    example: true,
  })
  @IsBoolean()
  isPresent: boolean
}

const EDITED_DESCRIPTION = 'Student Attendance edited successfully'
export const EditStudentAttendanceSwaggerDto = () => {
  const name = 'EditStudentAttendance'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editStudentAttendance',
      summary: 'Edita um registro de presença do aluno',
      description: 'Permite editar um registro de presença do aluno no sistema',
    })(target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditStudentAttendanceResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
