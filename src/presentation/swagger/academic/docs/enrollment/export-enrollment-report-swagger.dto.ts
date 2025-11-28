import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { BadRequestResponseDto } from '@utils/swagger-api-response'
import { IsNumber } from 'class-validator'

export class ExportEnrollmentReportBodySwaggerDto {
  @ApiProperty({
    description: 'ID do polo (região) para filtrar os alunos',
    example: 1,
    type: Number,
  })
  @IsNumber()
  regionId: number
}

export const ExportEnrollmentReportSwaggerDto = () => {
  const name = 'ExportEnrollmentReport'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'exportEnrollmentReport',
      summary: 'Exportar relatório de matrículas em Excel',
      description:
        'Gera e exporta um relatório em formato Excel com todos os alunos matriculados em turmas do polo especificado.',
    })(target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}
