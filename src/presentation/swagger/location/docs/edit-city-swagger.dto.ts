import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class EditCityBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the City',
    example: 'Simões Filho',
  })
  @IsString()
  name: string
}

const EDITED_DESCRIPTION = 'City edited successfully'
export const EditCitySwaggerDto = () => {
  const name = 'EditCity'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editCity',
      summary: 'Edita um município',
      description: 'Permite editar um município local da turma/extensão no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditCityResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
