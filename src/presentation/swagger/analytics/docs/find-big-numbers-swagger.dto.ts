import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiResponseOk,
  BadRequestResponseDto,
  UnauthorizedResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsOptional, IsString } from 'class-validator'

export class FindBigNumbersQueryDto {
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

export const FindBigNumbersSwaggerDto = () => {
  const name = 'FindBigNumbers'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'findBigNumbers',
      summary: 'Obter grandes números e estatísticas',
      description: 'Retorna os principais números e estatísticas relacionadas ao sistema.',
    })(target, key, descriptor)
    ApiResponseOk('Grandes números e estatísticas', FindBigNumbersResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError', 'EmailBadFormattedError'], target, key, descriptor)
    UnauthorizedResponseDto(name, ['InactiveResourceError', 'WrongCredentialsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
  }
}

export class BigNumbersDto {
  @ApiProperty({ example: 1500, description: 'Número total de alunos cadastrados' })
  totalStudents: number

  @ApiProperty({ example: 12000, description: 'Número total de matrículas realizadas' })
  enrolledStudents: number

  @ApiProperty({ example: 250, description: 'Número total de alunos aprovados' })
  studentsApproved: number

  @ApiProperty({ example: 75, description: 'Número total de evasões' })
  studentsDropedOut: number
}

export class FindBigNumbersResponseSwaggerDto {
  @ApiProperty({
    description: 'Resultado com os grandes números e estatísticas',
    type: BigNumbersDto,
  })
  result: BigNumbersDto
}
