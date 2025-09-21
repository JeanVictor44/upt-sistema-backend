import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { classStatuses } from '@root/domain/resource/enterprise/interfaces/class-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { createResourceDto } from '../entities/resource.dto'

const ClassStatusDto = createResourceDto(classStatuses, 'Class status', 'ClassStatusDto')

export const ListClassStatusesSwaggerDto = () => {
  const name = 'ListClassStatuses'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listClassStatuses',
      summary: 'Listar status de turmas',
      description: 'Permite listar todas os status de turmas possíveis no sistema.',
    })(target, key, descriptor)
    ApiResponseOk('Status de turma', ListClassStatusesResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

type ClassStatusDtoType = InstanceType<typeof ClassStatusDto>

export class ListClassStatusesResponseSwaggerDto {
  @ApiProperty({
    type: [ClassStatusDto],
    description: 'List class statuses',
  })
  results: ClassStatusDtoType[]
}
