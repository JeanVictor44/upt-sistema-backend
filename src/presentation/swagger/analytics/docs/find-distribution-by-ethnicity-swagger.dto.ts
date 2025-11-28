import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindDistributionByEthnicityQueryDto {
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

export const FindDistributionByEthnicitySwaggerDto = () => {
  const name = 'FindDistributionByEthnicity'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findDistributionByEthnicity',
      summary: 'Obter distribuição de estudantes por etnia',
      description: 'Retorna a distribuição de alunos por etnia.',
    })(target, key, descriptor)
    ApiResponseOk(
      'distribuição de alunos por etnia',
      FindDistributionByEthnicityResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class DistributionByEthnicitytDto {
  @ApiProperty({ example: 'AMARELO', description: 'etnia' })
  ethnicity: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes dessa etnia' })
  count: number
}

export class FindDistributionByEthnicityResponseSwaggerDto {
  @ApiProperty({
    description: 'Lista de distribuição de estudantes por etnia',
    type: [DistributionByEthnicitytDto],
  })
  result: DistributionByEthnicitytDto[]
}
