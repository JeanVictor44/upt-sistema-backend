import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { classOptions } from '@root/domain/resource/enterprise/interfaces/class-options'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { createResourceDto } from '../entities/resource.dto'

const ClassOptionDto = createResourceDto(classOptions, 'Class option', 'ClassOptionDto')

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

type ClassOptionDtoType = InstanceType<typeof ClassOptionDto>

export class ListClassOptionsResponseSwaggerDto {
  @ApiProperty({
    type: [ClassOptionDto],
    description: 'List class options',
  })
  results: ClassOptionDtoType[]
}
