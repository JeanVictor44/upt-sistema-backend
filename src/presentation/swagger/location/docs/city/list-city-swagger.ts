import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { CityDto } from '../../entities/city.dto'

export const ListCitiesSwaggerDto = () => {
  const name = 'ListCities'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listCities',
      summary: 'Listar os municípios',
      description: 'Permite listar todos os municípios locais da turma/extensão cadastrados no sistema',
    })(target, key, descriptor)
    ApiResponseOk(
      'municípios locais da turma/extensão cadastrados no sistema',
      ListCitiesResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListCitiesResponseSwaggerDto {
  @ApiProperty({
    type: [CityDto],
    description: 'List of cities',
  })
  results: CityDto[]
}
