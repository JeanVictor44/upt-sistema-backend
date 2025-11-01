import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class EditEditionBodySwaggerDto {
  @ApiProperty({
    description: 'Year of the Edition',
    example: 2024,
  })
  @IsNumber()
  year: number
}

const EDITED_DESCRIPTION = 'Edition edited successfully'
export const EditEditionSwaggerDto = () => {
  const name = 'EditEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editEdition',
      summary: 'Edita uma edição',
      description: 'Permite editar uma edição no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditEditionResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
