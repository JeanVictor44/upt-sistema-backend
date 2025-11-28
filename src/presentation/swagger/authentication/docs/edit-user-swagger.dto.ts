import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { UserDto } from '@root/presentation/swagger/authentication/entities/user.dto'
import { BadRequestResponseDto, UnauthorizedResponseDto, NotFoundResponseDto } from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class EditUserBodySwaggerDto {
  @ApiProperty({ example: 'Ione Santana Machado' })
  @IsString()
  name: string

  @ApiProperty({ example: 'ione@gmail.com' })
  @IsString()
  email: string

  @ApiProperty({ example: '09876543212' })
  @IsString()
  document: string

  @ApiProperty({ example: '71987557670' })
  @IsString()
  telephone: string

  @ApiProperty({ example: '123456789', required: false })
  @IsString()
  @IsOptional()
  password?: string

  @ApiProperty({ example: '2024-12-31T23:59:59.000Z', required: false })
  @IsOptional()
  disabledAt?: Date
}

export const EditUserSwaggerDto = () => {
  const name = 'EditUser'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editUser',
      summary: 'Editar usuário',
      description: 'Editar um usuário no sistema. Requer autenticação com token de um usuário com papel ADMIN.',
    })(target, key, descriptor)
    ApiCreatedResponse({
      type: EditUserResponseSwaggerDto,
      description: 'Usuário editado com sucesso',
    })(target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class EditUserResponseSwaggerDto {
  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  result: UserDto
}
