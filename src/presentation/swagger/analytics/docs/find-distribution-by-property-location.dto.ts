import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindDistributionByPropertyLocationQueryDto {
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

export const FindDistributionByPropertyLocationSwaggerDto = () => {
  const name = 'FindDistributionByPropertyLocation'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findDistributionByPropertyLocation',
      summary: 'Obter distribuição de estudantes por categoria da propriedade habitada',
      description: 'Retorna a distribuição de alunos por categoria da propriedade habitada.',
    })(target, key, descriptor)
    ApiResponseOk(
      'distribuição de alunos por categoria da propriedade habitada',
      FindDistributionByPropertyLocationResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class DistributionByPropertyLocationtDto {
  @ApiProperty({ example: 'ZONA URBANA', description: 'etnia' })
  propertyLocation: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes vivendo nessa categoria de propriedade' })
  count: number
}

export class FindDistributionByPropertyLocationResponseSwaggerDto {
  @ApiProperty({
    description: 'Lista de distribuição de estudantes por categoria da propriedade habitada',
    type: [DistributionByPropertyLocationtDto],
  })
  result: DistributionByPropertyLocationtDto[]
}
