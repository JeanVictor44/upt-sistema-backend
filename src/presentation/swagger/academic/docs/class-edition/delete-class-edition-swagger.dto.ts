import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Class edition deleted successfully'
export const DeleteClassEditionSwaggerDto = () => {
  const name = 'DeleteClassEdition'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteClassEdition',
      summary: 'Deletar uma oferta de turma',
      description: 'Permite deletar uma oferta de turma no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class DeleteClassEditionResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
