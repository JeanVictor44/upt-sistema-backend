import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { propertyLocationCategories } from '@root/domain/resource/enterprise/interfaces/property-location-category'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

export class PropertyLocationCategoryDto {
  @ApiProperty({
    description: 'Unique identifier of the gender',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the gender',
    enum: propertyLocationCategories,
    example: propertyLocationCategories[0],
  })
  name: (typeof propertyLocationCategories)[number]

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

export const ListPropertyLocationSwaggerDto = () => {
  const name = 'ListPropertyLocationCategories'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listPropertyLocationCategories',
      summary: 'Listar categorias de localização de imóvel',
      description: 'Permite listar as possíveis categorias de localização de imóvel',
    })(target, key, descriptor)
    ApiResponseOk(
      'Possíveis categorias de localização de imóvel',
      ListPropertyLocationCategoryResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListPropertyLocationCategoryResponseSwaggerDto {
  @ApiProperty({
    type: [PropertyLocationCategoryDto],
    description: 'List property location categories',
  })
  results: PropertyLocationCategoryDto[]
}
