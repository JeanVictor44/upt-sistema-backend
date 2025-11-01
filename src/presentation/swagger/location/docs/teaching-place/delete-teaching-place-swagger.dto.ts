import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Teaching Place deleted successfully'
export const DeleteTeachingPlaceSwaggerDto = () => {
  const name = 'DeleteTeachingPlace'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteTeachingPlace',
      summary: 'Deletar uma unidade de ensino',
      description: 'Permite deletar uma unidade de ensino no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
    ConflictResponseDto(name, ['ResourceConflictError'], target, key, descriptor)
  }
}

export class DeleteTeachingPlaceResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
