import { ApiOperation, ApiProperty, PickType } from '@nestjs/swagger'
import { UserDto } from '@root/presentation/swagger/authentication/entities/user.dto'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class SessionBodySwaggerDto extends PickType(UserDto, ['document']) {
  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  @IsString()
  password: string
}

export const SessionSwaggerDto = () => {
  const name = 'Session'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'signIn',
      summary: 'Autenticação de usuário',
      description:
        'Realiza o login/autenticação do usuário no sistema e retorna o access token para uso nas rotas protegidas.',
    })(target, key, descriptor)
    ApiResponseOk('Access token', SessionResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class UserAuthenticatedSwaggerDto extends PickType(UserDto, ['id', 'name', 'role']) {}

export class SessionResponseSwaggerDto {
  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0',
  })
  accessToken: string
  @ApiProperty({
    description: 'User information',
    type: UserAuthenticatedSwaggerDto,
  })
  user: UserAuthenticatedSwaggerDto
}
