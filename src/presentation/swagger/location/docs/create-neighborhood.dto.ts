import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class CreateNeighborhoodBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the Neighborhood',
    example: 'Manoel Dias',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'City ID of the Neighborhood',
    example: 1,
  })
  @IsNumber()
  cityId: number

  @ApiProperty({
    description: 'Region ID of the Neighborhood',
    example: 1,
  })
  @IsNumber()
  regionId: number
}

const CRATED_DESCRIPTION = 'Neighborhood created successfully'
export const CreateNeighborhoodSwaggerDto = () => {
  const name = 'CreateNeighborhood'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createNeighborhood',
      summary: 'Criar um bairro',
      description: 'Permite o cadastro de um novo bairro',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CRATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateNeighborhoodResponseSwaggerDto {
  @ApiProperty({
    description: CRATED_DESCRIPTION,
  })
  description: typeof CRATED_DESCRIPTION
}
