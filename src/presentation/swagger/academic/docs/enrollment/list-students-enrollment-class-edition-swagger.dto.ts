import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { StudentEnrollmentDto } from '../../entities/student-enrollment.dto'

export const ListStudentsEnrollmentClassEditionSwaggerDto = () => {
  const name = 'ListStudentsEnrollmentClassEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listStudentsEnrollmentClassEdition',
      summary: 'Listar os alunos matriculados em uma edição de turma',
      description: 'Permite listar todos os alunos matriculados em uma edição de turma específica',
    })(target, key, descriptor)
    ApiResponseOk(
      'Alunos matriculados em uma edição de turma específica',
      ListStudentsEnrollmentClassEditionResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListStudentsEnrollmentClassEditionResponseSwaggerDto {
  @ApiProperty({
    type: [StudentEnrollmentDto],
    description: 'List of students enrolled in the class edition',
  })
  results: StudentEnrollmentDto[]
}
