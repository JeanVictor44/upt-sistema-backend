import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateUserRoleBodySwaggerDto {
  @ApiProperty({
    description: 'Role ID to be assigned to the user',
    example: 1,
  })
  @IsNumber()
  roleId: number

  @ApiProperty({
    description: 'Class edition ID to be assigned to the user',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  classEditionId?: number

  @ApiProperty({
    description: 'Region ID to be assigned to the user',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  regionId?: number
}

const CREATED_DESCRIPTION = 'Role succesfully assigned'

export const CreateUserRoleSwaggerDto = () => {
  const name = 'CreateUserRole'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createUserRole',
      summary: 'Atribuição de papel ao usuário',
      description: 'Atribui um papel a um usuário existente',
    })(target, key, descriptor)
    ApiResponseOk(CREATED_DESCRIPTION, CreateUserRoleResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class CreateUserRoleResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
  })
  description: typeof CREATED_DESCRIPTION
}
