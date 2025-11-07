import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { UserWithDetailsDto } from '@root/presentation/swagger/authentication/entities/user.dto'
import {
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
  ApiResponseOk,
} from '@utils/swagger-api-response'

export const ListUserSwaggerDto = () => {
  const name = 'ListUser'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listUsers',
      summary: 'Listar usuários',
      description: 'Lista todos os usuários do sistema. Requer autenticação com token de um usuário com papel ADMIN.',
    })(target, key, descriptor)
    ApiResponseOk('Listar usuários', ListUserResponseSwaggerDto, target, key, descriptor)

    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class ListUserResponseSwaggerDto {
  @ApiProperty({
    description: 'User information',
    type: [UserWithDetailsDto],
  })
  results: UserWithDetailsDto[]
}
