import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAddressBodySwaggerDto {
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

export class AddressCreatedSwaggerDto {
  @ApiProperty({
    description: 'ID of the created address',
    example: 1,
    type: Number,
  })
  @IsNumber()
  id: number
}

const CREATED_DESCRIPTION = 'Address created successfully'
export const CreateAddressSwaggerDto = () => {
  const name = 'CreateAddress'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createAddress',
      summary: 'Criar um novo endereço',
      description: 'Permite cadastro um novo endereço no sistema.',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreatedResponse({
      type: CreateAddressResponseSwaggerDto,
      description: CREATED_DESCRIPTION,
    })(target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateAddressResponseSwaggerDto {
  @ApiProperty({
    description: 'Result of the address creation',
    type: AddressCreatedSwaggerDto,
  })
  result: AddressCreatedSwaggerDto
}
