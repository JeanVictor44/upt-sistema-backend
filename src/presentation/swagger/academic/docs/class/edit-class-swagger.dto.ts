import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class EditClassBodySwaggerDto {
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

const EDITED_DESCRIPTION = 'Class edited successfully'
export const EditClassSwaggerDto = () => {
  const name = 'EditClass'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editClass',
      summary: 'Edita uma turma',
      description: 'Permite editar uma turma no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditClassResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
