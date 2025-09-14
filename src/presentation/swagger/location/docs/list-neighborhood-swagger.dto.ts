import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { NeighborhoodDetailsDto } from '../entities/neighborhood-details.dto'

export const ListNeighborhoodsSwaggerDto = () => {
  const name = 'ListNeighborhoods'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listNeighborhoods',
      summary: 'Listar os bairros',
      description: 'Permite listar todos os bairros cadastrados no sistema',
    })(target, key, descriptor)
    ApiResponseOk('Bairros cadastrados no sistema', ListNeighborhoodsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListNeighborhoodsResponseSwaggerDto {
  @ApiProperty({
    type: [NeighborhoodDetailsDto],
    description: 'List of neighborhoods',
  })
  results: NeighborhoodDetailsDto[]
}
