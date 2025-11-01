import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { shifts } from '@root/domain/resource/enterprise/interfaces/shift'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

class ShiftDto {
  @ApiProperty({
    description: 'Unique identifier of the shift',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the shift',
    enum: shifts,
    example: shifts[0],
  })
  name: (typeof shifts)[number]

  @ApiProperty({
    description: 'Timestamp of when the shift was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the shift was last updated',
    example: new Date(),
  })
  updatedAt: Date
}

export const ListShiftsSwaggerDto = () => {
  const name = 'ListShifts'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listShifts',
      summary: 'Listar turnos',
      description: 'Permite listar os possíveis turnos',
    })(target, key, descriptor)
    ApiResponseOk('Possíveis turnos', ListShiftsResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListShiftsResponseSwaggerDto {
  @ApiProperty({
    type: [ShiftDto],
    description: 'List shifts',
  })
  results: ShiftDto[]
}
