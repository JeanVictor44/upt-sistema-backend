import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindEnrollmentEvolutionQueryDto {
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

export const FindEnrollmentEvolutionSwaggerDto = () => {
  const name = 'FindEnrollmentEvolution'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findEnrollmentEvolution',
      summary: 'Obter evolução de matrículas por período',
      description: 'Retorna a evolução de matrículas por período.',
    })(target, key, descriptor)
    ApiResponseOk(
      'Evolução de matrículas por período',
      FindEnrollmentEvolutionResponseSwaggerDto,
      target,
      key,
      descriptor,
    )
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class EnrollmentEvolutiontDto {
  @ApiProperty({ example: '2025', description: 'Período da matrícula' })
  period: string

  @ApiProperty({ example: 1200, description: 'Número total de estudantes vivendo nessa categoria de propriedade' })
  count: number
}

export class FindEnrollmentEvolutionResponseSwaggerDto {
  @ApiProperty({
    description: 'Lista de evolução de matrículas por período',
    type: [EnrollmentEvolutiontDto],
  })
  result: EnrollmentEvolutiontDto[]
}
