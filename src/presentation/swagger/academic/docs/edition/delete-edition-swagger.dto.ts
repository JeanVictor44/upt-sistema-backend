import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Edition deleted successfully'
export const DeleteEditionSwaggerDto = () => {
  const name = 'DeleteEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteEdition',
      summary: 'Deletar uma edição',
      description: 'Permite deletar uma edição no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
    ConflictResponseDto(name, ['ResourceConflictError'], target, key, descriptor)
  }
}

export class DeleteEditionResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
