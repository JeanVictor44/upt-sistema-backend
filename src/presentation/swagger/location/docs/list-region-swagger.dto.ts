import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { RegionDto } from '../entities/region.dto'

export const ListRegionsSwaggerDto = () => {
  const name = 'ListRegions'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listRegions',
      summary: 'Listar os Polos',
      description: 'Permite listar todos os polos cadastrados no sistema',
    })(target, key, descriptor)
    ApiResponseOk('Polos cadastrados no sistema', ListRegionsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListRegionsResponseSwaggerDto {
  @ApiProperty({
    type: [RegionDto],
    description: 'List of regions',
  })
  results: RegionDto[]
}
