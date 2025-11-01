import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { EditionDto } from '../../entities/edition.dto'

export const ListEditionsSwaggerDto = () => {
  const name = 'ListEditions'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listEditions',
      summary: 'Listar as edições',
      description: 'Permite listar todas as edições cadastradas no sistema',
    })(target, key, descriptor)
    ApiResponseOk('Edições cadastradas no sistema', ListEditionsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListEditionsResponseSwaggerDto {
  @ApiProperty({
    type: [EditionDto],
    description: 'List of editions',
  })
  results: EditionDto[]
}
