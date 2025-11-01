import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class EditNeighorhoodBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the Neighorhood',
    example: 'Mata escura',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'ID of the City the Neighorhood belongs to',
    example: 1,
  })
  @IsNumber()
  cityId: number

  @ApiProperty({
    description: 'ID of the Region the Neighorhood belongs to',
    example: 1,
  })
  @IsNumber()
  regionId: number
}

const EDITED_DESCRIPTION = 'Neighborhood edited successfully'
export const EditNeighorhoodSwaggerDto = () => {
  const name = 'EditNeighorhood'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editNeighorhood',
      summary: 'Edita um bairro',
      description: 'Permite editar um bairro no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditNeighorhoodResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
