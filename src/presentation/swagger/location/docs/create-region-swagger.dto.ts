import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class CreateRegionBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the region',
    example: 'Camaçari',
  })
  @IsString()
  name: string
}

const CRATED_DESCRIPTION = 'Region created successfully'
export const CreateRegionSwaggerDto = () => {
  const name = 'CreateRegion'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createRegion',
      summary: 'Criação de um Polo',
      description: 'Permite cadastro um novo polo no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CRATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateRegionResponseSwaggerDto {
  @ApiProperty({
    description: CRATED_DESCRIPTION,
  })
  description: typeof CRATED_DESCRIPTION
}
