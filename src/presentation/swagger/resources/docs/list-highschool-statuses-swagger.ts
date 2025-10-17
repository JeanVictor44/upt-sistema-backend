import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { highschoolStatuses } from '@root/domain/resource/enterprise/interfaces/highschool-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

class HighschoolStatusDto {
  @ApiProperty({
    description: 'Unique identifier of the gender',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the gender',
    enum: highschoolStatuses,
    example: highschoolStatuses[0],
  })
  name: (typeof highschoolStatuses)[number]

  @ApiProperty({
    description: 'Timestamp of when the gender was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the gender was last updated',
    example: new Date(),
  })
  updatedAt: Date
}
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

export class ListHighschoolStatusesResponseSwaggerDto {
  @ApiProperty({
    type: [HighschoolStatusDto],
    description: 'List highschool statuses',
  })
  results: HighschoolStatusDto[]
}
