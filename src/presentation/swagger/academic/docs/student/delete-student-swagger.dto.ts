import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'Student deleted successfully'
export const DeleteStudentSwaggerDto = () => {
  const name = 'DeleteStudent'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteStudent',
      summary: 'Deletar um aluno',
      description: 'Permite deletar um aluno no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class DeleteStudentResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
