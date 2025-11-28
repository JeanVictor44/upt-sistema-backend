import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class CreateClassBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the class',
    example: 'Arvoredo Pinheiro Matutino',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'teaching place id of the class',
    example: 1,
  })
  @IsNumber()
  teachingPlaceId: number
}

const CREATED_DESCRIPTION = 'Class created successfully'
export const CreateClassSwaggerDto = () => {
  const name = 'CreateClass'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createClass',
      summary: 'Criar uma turma',
      description: 'Permite o cadastro de uma nova turma no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateClassResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
