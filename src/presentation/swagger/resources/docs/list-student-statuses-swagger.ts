import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { studentStatuses } from '@root/domain/resource/enterprise/interfaces/student-statuses'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { createResourceDto } from '../entities/resource.dto'

const StudentStatusDto = createResourceDto(studentStatuses, 'Student status', 'StudentStatusDto')

export const ListStudentStatusesSwaggerDto = () => {
  const name = 'ListStudentStatuses'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listStudentStatuses',
      summary: 'Listar status da matrícula',
      description: 'Permite listar os status da matrícula do aluno no programa UPT',
    })(target, key, descriptor)
    ApiResponseOk(
      'Status da matrícula do aluno no programa UPT',
      ListStudenStatusesResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

type StudentStatusDtoType = InstanceType<typeof StudentStatusDto>

export class ListStudenStatusesResponseSwaggerDto {
  @ApiProperty({
    type: [StudentStatusDto],
    description: 'List studen statuses',
  })
  results: StudentStatusDtoType[]
}
