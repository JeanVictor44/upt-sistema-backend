import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { StudentDetailsDto } from '../../entities/student-details.dto'

export const ListStudentsSwaggerDto = () => {
  const name = 'ListStudents'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listStudents',
      summary: 'Listar os alunos',
      description: 'Permite listar todos os alunos cadastrados no sistema',
    })(target, key, descriptor)
    ApiResponseOk('Alunos cadastrados no sistema', ListStudentsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListStudentsResponseSwaggerDto {
  @ApiProperty({
    type: [StudentDetailsDto],
    description: 'List of students',
  })
  results: StudentDetailsDto[]
}
