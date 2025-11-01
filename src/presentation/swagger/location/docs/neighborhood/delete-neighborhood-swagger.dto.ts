import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Neighborhood deleted successfully'
export const DeleteNeighborhoodSwaggerDto = () => {
  const name = 'DeleteNeighborhood'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteNeighborhood',
      summary: 'Deletar um bairro',
      description: 'Permite deletar um bairro no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class DeleteNeighborhoodResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
