import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Class deleted successfully'
export const DeleteClassSwaggerDto = () => {
  const name = 'DeleteClass'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteClass',
      summary: 'Deletar uma turma',
      description: 'Permite deletar uma turma no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class DeleteClassResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
