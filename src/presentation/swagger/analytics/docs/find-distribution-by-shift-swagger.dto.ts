import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindDistributionByShiftQueryDto {
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

export const FindDistributionByShiftSwaggerDto = () => {
  const name = 'FindDistributionByShift'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findDistributionByShift',
      summary: 'Obter distribuição de estudantes por turno',
      description:
        'Retorna a distribuição do número de estudantes matriculados em turmas, agrupados por turno (matutino, vespertino, noturno).',
    })(target, key, descriptor)
    ApiResponseOk('Grandes números e estatísticas', FindDistributionByShiftResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class DistributionByShiftDto {
  @ApiProperty({ example: 'MATUTINO', description: 'turno' })
  shift: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes no turno' })
  studentCount: number
}

export class FindDistributionByShiftResponseSwaggerDto {
  @ApiProperty({
    description: 'Lista de distribuição de estudantes por turno',
    type: [DistributionByShiftDto],
  })
  result: DistributionByShiftDto[]
}
