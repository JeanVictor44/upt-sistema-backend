import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { TeachingPlaceDetailsDto } from '../../entities/teaching-place-details.dto'

export const ListTeachingPlaceSwaggerDto = () => {
  const name = 'ListTeachingPlaces'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listTeachingPlaces',
      summary: 'Listar os locais de ensino',
      description: 'Permite listar todos os locais de ensino cadastrados no sistema',
    })(target, key, descriptor)
    ApiResponseOk(
      'Locais de ensino cadastrados no sistema',
      ListTeachingPlacesResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListTeachingPlacesResponseSwaggerDto {
  @ApiProperty({
    type: [TeachingPlaceDetailsDto],
    description: 'List of teaching places with their details',
  })
  results: TeachingPlaceDetailsDto[]
}
