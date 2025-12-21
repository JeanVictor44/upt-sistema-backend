import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class EditClassEditionBodySwaggerDto {
  @ApiProperty({
    description: 'teaching place id of the class',
    example: 1,
  })
  @IsNumber()
  teachingPlaceId: number

  @ApiProperty({
    description: 'Unique identifier of the edition',
    type: Number,
  })
  @IsNumber()
  editionId: number

  @ApiProperty({
    description: 'shift id of the class',
    example: 1,
  })
  @IsNumber()
  shiftId: number

  @ApiProperty({
    description: 'optional id of the class',
    example: 1,
  })
  @IsNumber()
  optionId: number

  @ApiProperty({
    description: 'status id of the class',
    example: 1,
  })
  @IsNumber()
  statusId: number

  @ApiProperty({
    description: 'Count of enrolled students',
    type: Number,
  })
  @IsNumber()
  enrolledCount: number
}

const EDITED_DESCRIPTION = 'Class Edition edited successfully'
export const EditClassEditionSwaggerDto = () => {
  const name = 'EditClassEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editClassEdition',
      summary: 'Edita uma oferta de turma',
      description: 'Permite editar uma oferta de turma no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditClassEditionResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
