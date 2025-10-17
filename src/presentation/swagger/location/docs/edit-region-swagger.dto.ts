import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class EditRegionBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the Region',
    example: 'Simões Filho',
  })
  @IsString()
  name: string
}

const EDITED_DESCRIPTION = 'Region edited successfully'
export const EditRegionSwaggerDto = () => {
  const name = 'EditRegion'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editRegion',
      summary: 'Edita um município',
      description: 'Permite editar um polo no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditRegionResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
