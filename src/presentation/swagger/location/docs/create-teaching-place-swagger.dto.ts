import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class CreateTeachingPlaceBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the teaching place',
    example: 'Colégio da Bahia',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'ID of the neighborhood',
    example: 1,
  })
  @IsNumber()
  neighborhoodId: number
}

const CREATED_DESCRIPTION = 'Teaching place created successfully'
export const CreateTeachingPlaceSwaggerDto = () => {
  const name = 'CreateTeachingPlace'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createTeachingPlace',
      summary: 'Criar um local de ensino',
      description: 'Permite cadastrar um novo local de ensino no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateTeachingPlaceResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
