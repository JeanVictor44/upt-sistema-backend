import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { ClassEditionDetailsDto } from '../../entities/class-edition-details.dto'

export const ListClassEditionsSwaggerDto = () => {
  const name = 'ListClassEditions'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'ListClassEditions',
      summary: 'Listar as ofertas de turmas',
      description: 'Permite listar todas as ofertas de turma cadastradas no sistema',
    })(target, key, descriptor)
    ApiResponseOk(
      'Ofertas de turmas cadastradas no sistema',
      ListClassEditionsResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListClassEditionsResponseSwaggerDto {
  @ApiProperty({
    type: [ClassEditionDetailsDto],
    description: 'List of classes',
  })
  results: ClassEditionDetailsDto[]
}
