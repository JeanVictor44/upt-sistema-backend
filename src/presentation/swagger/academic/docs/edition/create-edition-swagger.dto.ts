import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class CreateEditionBodySwaggerDto {
  @ApiProperty({
    description: 'Year of the Edition',
    example: 2024,
  })
  @IsNumber()
  year: number
}

const CREATED_DESCRIPTION = 'Edition created successfully'
export const CreateEditionSwaggerDto = () => {
  const name = 'CreateEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createEdition',
      summary: 'Criar uma edição',
      description: 'Permite cadastro de uma edição no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(CREATED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateEditionResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
