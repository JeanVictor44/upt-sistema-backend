import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { classOptions } from '@root/domain/resource/enterprise/interfaces/class-option'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

export class ClassOptionDto {
  @ApiProperty({
    description: 'Unique identifier of the class option',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the class option',
    enum: classOptions,
    example: classOptions[0],
  })
  name: (typeof classOptions)[number]

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

export const ListClassOptionSwaggerDto = () => {
  const name = 'ListClassOptions'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listClassOptions',
      summary: 'Listar opções de turma',
      description: 'Permite listar todas as opções padrões de turmas',
    })(target, key, descriptor)
    ApiResponseOk('Opções padrões de turma', ListClassOptionsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListClassOptionsResponseSwaggerDto {
  @ApiProperty({
    type: [ClassOptionDto],
    description: 'List class options',
  })
  results: ClassOptionDto[]
}
