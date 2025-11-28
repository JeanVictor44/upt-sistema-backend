import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindTopClassEditionEnrollmentQueryDto {
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

export const FindTopClassEditionsEnrollmentSwaggerDto = () => {
  const name = 'FindTopClassEditionsEnrollment'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findTopClassEditionsEnrollment',
      summary: 'Obter top 5 ofertas de turma com maior número de matrículas',
      description: 'Retorna as cinco ofertas de turma com o maior número de estudantes matriculados.',
    })(target, key, descriptor)
    ApiResponseOk(
      'Grandes números e estatísticas',
      FindTopClassEditionsEnrollmentResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class TopClassEditionEnrollmentDto {
  @ApiProperty({ example: 'Turma 1 - 2024', description: 'Nome da oferta de turma' })
  name: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes na oferta de turma' })
  value: number
}

export class FindTopClassEditionsEnrollmentResponseSwaggerDto {
  @ApiProperty({
    description: 'Top 5 ofertas de turma com maior número de matrículas',
    type: [TopClassEditionEnrollmentDto],
  })
  result: TopClassEditionEnrollmentDto[]
}
