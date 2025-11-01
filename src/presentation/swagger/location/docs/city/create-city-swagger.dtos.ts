import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class CreateCityBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the City',
    example: 'Simões Filho',
  })
  @IsString()
  name: string
}

const CREATED_DESCRIPTION = 'City created successfully'
export const CreateCitySwaggerDto = () => {
  const name = 'CreateCity'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createCity',
      summary: 'Criar um município',
      description: 'Permite cadastro um novo município local da turma/extensão no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateCityResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
