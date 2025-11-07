import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { roles } from '@root/domain/resource/enterprise/interfaces/role'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

export class RoleDto {
  @ApiProperty({
    description: 'Unique identifier of the class option',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the role option',
    enum: roles,
    example: roles[0],
  })
  name: (typeof roles)[number]

  @ApiProperty({
    description: 'Timestamp of when the class option was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the class option was last updated',
    example: new Date(),
  })
  updatedAt: Date
}

export const ListRolesSwaggerDto = () => {
  const name = 'ListRoles'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listRoles',
      summary: 'Listar papéis',
      description: 'Permite listar todos os papéis disponíveis no sistema.',
    })(target, key, descriptor)
    ApiResponseOk('Papéis dos usuários', ListRolesResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListRolesResponseSwaggerDto {
  @ApiProperty({
    type: [RoleDto],
    description: 'List class options',
  })
  results: RoleDto[]
}
