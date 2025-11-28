import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
  ApiResponseOk,
} from '@utils/swagger-api-response'

import { UserRoleManagerDetailsDto } from '../entities/user-role-manager-details.dto'

export const ListRegionManagersSwaggerDto = () => {
  const name = 'ListRegionManagers'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listRegionManagers',
      summary: 'Listar o histórico de gestores do polo',
      description: 'Lista todos os gestores (ativos e inativos) de um polo específico.',
    })(target, key, descriptor)
    ApiResponseOk('Listar histórico de gestores', ListUserRoleManagerResponseSwaggerDto, target, key, descriptor)

    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class ListUserRoleManagerResponseSwaggerDto {
  @ApiProperty({
    description: 'User information',
    type: [UserRoleManagerDetailsDto],
  })
  results: UserRoleManagerDetailsDto[]
}
