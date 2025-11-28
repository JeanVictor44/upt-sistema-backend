import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsOptional } from 'class-validator'

export class EditUserRoleBodySwaggerDto {
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

const EDITED_DESCRIPTION = 'Role succesfully assigned'

export const EditUserRoleSwaggerDto = () => {
  const name = 'EditUserRole'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editUserRole',
      summary: 'Edição de papel do usuário',
      description: 'Edita o papel de um usuário existente',
    })(target, key, descriptor)
    ApiResponseOk(EDITED_DESCRIPTION, EditUserRoleResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class EditUserRoleResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
