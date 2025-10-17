import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class ExpireUserBodySwaggerDto {
  @ApiProperty({
    description: 'indentifier of the user to expire role',
    type: Number,
  })
  @IsNumber()
  userId: number
}

export const ExpireUserRoleSwaggerDto = () => {
  const name = 'ExpireUserRole'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'expireUserRole',
      summary: 'Expirar papel do usuário',
      description: 'Expira o papel atual do usuário, removendo suas permissões associadas no sistema.',
    })(target, key, descriptor)
    ApiResponseOk('expire user role', ExpireUserRoleResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

const DESCRIPTION_MESSAGE = 'user role has been expired successfully'

export class ExpireUserRoleResponseSwaggerDto {
  @ApiProperty({
    description: DESCRIPTION_MESSAGE,
  })
  description: typeof DESCRIPTION_MESSAGE
}
