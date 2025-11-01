import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class EditAddressBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the street',
    example: 'Av. Paulista',
    required: false,
  })
  @IsString()
  @IsOptional()
  street?: string

  @ApiProperty({
    description: 'Number of the address',
    example: 1000,
  })
  @IsNumber()
  @IsOptional()
  number?: number

  @ApiProperty({
    description: 'Neighborhood of the address',
    example: 'Bela Vista',
  })
  @IsString()
  @IsOptional()
  neighborhood?: string

  @ApiProperty({
    description: 'City of the address',
    example: 'Águas de Lindoia',
  })
  @IsString()
  @IsOptional()
  city?: string

  @ApiProperty({
    description: 'Zip code of the address',
    example: '13940000',
    required: false,
  })
  @IsString()
  @IsOptional()
  zipCode?: string

  @ApiProperty({
    description: 'ID of the property location category',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  propertyLocationCategoryId?: number

  @ApiProperty({
    description: 'Traditional community name of the address',
    example: 'Comunidade X',
    required: false,
  })
  @IsString()
  @IsOptional()
  traditionalCommunityName?: string
}

const EDITED_DESCRIPTION = 'Address edited successfully'
export const EditAddressSwaggerDto = () => {
  const name = 'EditAddress'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editAddress',
      summary: 'Edita um endereço',
      description: 'Permite editar um endereço no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditAddressResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
