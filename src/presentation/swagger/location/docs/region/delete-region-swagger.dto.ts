import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Region deleted successfully'
export const DeleteRegionSwaggerDto = () => {
  const name = 'DeleteRegion'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteRegion',
      summary: 'Deletar um polo',
      description: 'Permite deletar um polo no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
    ConflictResponseDto(name, ['ResourceConflictError'], target, key, descriptor)
  }
}

export class DeleteRegionResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
