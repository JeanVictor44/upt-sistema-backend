import { ApiOperation, ApiProperty, PickType } from '@nestjs/swagger'
import { UserDto } from '@root/presentation/swagger/authentication/entities/user.dto'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsString } from 'class-validator'

export class CreateUserBodySwaggerDto extends PickType(UserDto, ['document', 'telephone', 'email', 'name']) {
  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  @IsString()
  password: string
}

export const CreateUserSwaggerDto = () => {
  const name = 'CreateUser'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createUser',
      summary: 'Criar usuário',
      description: 'Cria um novo usuário no sistema. Requer autenticação com token de um usuário com papel ADMIN.',
    })(target, key, descriptor)
    ApiResponseOk('Create User', CreateUserResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class CreateUserResponseSwaggerDto {
  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  result: UserDto
}
