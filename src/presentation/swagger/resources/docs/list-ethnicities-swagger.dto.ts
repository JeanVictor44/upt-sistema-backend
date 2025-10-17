import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ethnicities } from '@root/domain/resource/enterprise/interfaces/ethnicity'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

class EthnicitiesDto {
  @ApiProperty({
    description: 'Unique identifier of the ethnicity',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the ethnicity',
    enum: ethnicities,
    example: ethnicities[0],
  })
  name: (typeof ethnicities)[number]

  @ApiProperty({
    description: 'Timestamp of when the ethnicity was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the ethnicity was last updated',
    example: new Date(),
  })
  updatedAt: Date
}
export const ListEthnicitiesSwaggerDto = () => {
  const name = 'ListEthnicities'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listEthnicitiessIdentities',
      summary: 'Listar etnias',
      description: 'Permite listar as possíveis etnias',
    })(target, key, descriptor)
    ApiResponseOk('Possíveis etnias', ListEthnicitiesResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListEthnicitiesResponseSwaggerDto {
  @ApiProperty({
    type: [EthnicitiesDto],
    description: 'List Ethnicitiess',
  })
  results: EthnicitiesDto[]
}
