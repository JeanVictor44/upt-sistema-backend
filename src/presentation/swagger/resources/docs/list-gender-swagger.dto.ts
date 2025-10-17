import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { genderIdentity } from '@root/domain/resource/enterprise/interfaces/gender-identity'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

class GendersDto {
  @ApiProperty({
    description: 'Unique identifier of the gender',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the gender',
    enum: genderIdentity,
    example: genderIdentity[0],
  })
  name: (typeof genderIdentity)[number]

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
export const ListGendersSwaggerDto = () => {
  const name = 'ListGenders'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listGendersIdentities',
      summary: 'Listar identidades de gênero',
      description: 'Permite listar as possíveis identidades de gênero',
    })(target, key, descriptor)
    ApiResponseOk('Possíveis identidades de gênero', ListGenderResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListGenderResponseSwaggerDto {
  @ApiProperty({
    type: [GendersDto],
    description: 'List genders identities',
  })
  results: GendersDto[]
}
