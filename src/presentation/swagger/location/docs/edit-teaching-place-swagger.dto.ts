import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class EditTeachingPlaceBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the teaching place',
    example: 'Colégio da Bahia',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'ID of the neighborhood',
    example: 1,
  })
  @IsNumber()
  neighborhoodId: number
}

const EDITED_DESCRIPTION = 'Teaching place edited successfully'
export const EditTeachingPlaceSwaggerDto = () => {
  const name = 'EditTeachingPlace'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editTeachingPlace',
      summary: 'Editar um local de ensino',
      description: 'Permite editar um local de ensino no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditTeachingPlaceResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
