import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { ApiCreated, BadRequestResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'

const DELETED_DESCRIPTION = 'City deleted successfully'
export const DeleteCitySwaggerDto = () => {
  const name = 'DeleteCity'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'deleteCity',
      summary: 'Deletar um município',
      description: 'Permite deletar um município no sistema',
    })(target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(DELETED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class DeleteCityResponseSwaggerDto {
  @ApiProperty({
    description: DELETED_DESCRIPTION,
  })
  description: typeof DELETED_DESCRIPTION
}
