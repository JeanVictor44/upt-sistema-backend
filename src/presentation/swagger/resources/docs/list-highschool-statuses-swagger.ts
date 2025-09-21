import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { highschoolStatuses } from '@root/domain/resource/enterprise/interfaces/highschool-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { createResourceDto } from '../entities/resource.dto'

const HighschoolStatusDto = createResourceDto(highschoolStatuses, 'Highschool status', 'HighschoolStatusDto')

export const ListHighschoolStatusesSwaggerDto = () => {
  const name = 'ListHighschoolStatuses'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listHighschoolStatuses',
      summary: 'Listar status do aluno no ensino médio',
      description: 'Permite listar os status do aluno no ensino médio',
    })(target, key, descriptor)
    ApiResponseOk('Status do aluno no ensino médio', ListHighschoolStatusesResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

type HighschoolStatusDtoType = InstanceType<typeof HighschoolStatusDto>

export class ListHighschoolStatusesResponseSwaggerDto {
  @ApiProperty({
    type: [HighschoolStatusDto],
    description: 'List highschool statuses',
  })
  results: HighschoolStatusDtoType[]
}
