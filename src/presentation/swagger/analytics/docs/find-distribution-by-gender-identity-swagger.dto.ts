import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindDistributionByGenderIdentityQueryDto {
  @ApiProperty({
    description: 'ID da edição para filtrar os números',
    example: '1',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  editionId?: string
}

export const FindDistributionByGenderIdentitySwaggerDto = () => {
  const name = 'FindDistributionByGenderIdentity'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findDistributionByGenderIdentity',
      summary: 'Obter distribuição de estudantes por turno',
      description: 'Retorna a distribuição de alunos por identidade de gênero.',
    })(target, key, descriptor)
    ApiResponseOk(
      'distribuição de alunos por identidade de gênero',
      FindDistributionByGenderIdentityResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class DistributionByGenderIdentitytDto {
  @ApiProperty({ example: 'CISGÊNERO MASCULINO', description: 'identidade de gênero' })
  genderIdentity: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes dessa identidade de gênero' })
  count: number
}

export class FindDistributionByGenderIdentityResponseSwaggerDto {
  @ApiProperty({
    description: 'Lista de distribuição de estudantes por identidade de gênero',
    type: [DistributionByGenderIdentitytDto],
  })
  result: DistributionByGenderIdentitytDto[]
}
