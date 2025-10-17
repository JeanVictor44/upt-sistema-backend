import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { classStatuses } from '@root/domain/resource/enterprise/interfaces/class-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

export class ClassStatusDto {
  @ApiProperty({
    description: 'Unique identifier of the class status',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the class status',
    enum: classStatuses,
    example: classStatuses[0],
  })
  name: (typeof classStatuses)[number]

  @ApiProperty({
    description: 'Timestamp of when the class status was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the class status was last updated',
    example: new Date(),
  })
  updatedAt: Date
}

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

export class ListClassStatusesResponseSwaggerDto {
  @ApiProperty({
    type: [ClassStatusDto],
    description: 'List class statuses',
  })
  results: ClassStatusDto[]
}
