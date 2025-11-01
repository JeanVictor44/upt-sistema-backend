import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class CreateClassEditionBodySwaggerDto {
  @ApiProperty({
    description: 'Unique identifier of the class',
    type: Number,
  })
  @IsNumber()
  classId: number

  @ApiProperty({
    description: 'Unique identifier of the edition',
    type: Number,
  })
  @IsNumber()
  editionId: number

  @ApiProperty({
    description: 'Count of enrolled students',
    type: Number,
  })
  @IsNumber()
  enrolledCount: number
}

const CREATED_DESCRIPTION = 'Class Edition created successfully'
export const CreateClassEditionSwaggerDto = () => {
  const name = 'CreateClassEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createClassEdition',
      summary: 'Criar uma oferta de turma',
      description: 'Permite o cadastro de uma nova oferta de turma no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateClassEditionResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
