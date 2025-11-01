import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { ClassDetailsDto } from '../../entities/class-details.dto'

export const ListClassesSwaggerDto = () => {
  const name = 'ListClasses'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listClasses',
      summary: 'Listar as turmas',
      description: 'Permite listar todas as turmas cadastradas no sistema',
    })(target, key, descriptor)
    ApiResponseOk('Turmas cadastradas no sistema', ListClassesResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListClassesResponseSwaggerDto {
  @ApiProperty({
    type: [ClassDetailsDto],
    description: 'List of classes',
  })
  results: ClassDetailsDto[]
}
