import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { enrollmentStatuses } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

class EnrollmentStatusDto {
  @ApiProperty({
    description: 'Unique identifier of the enrollment status',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Name of the enrollment status',
    enum: enrollmentStatuses,
    example: enrollmentStatuses[0],
  })
  name: (typeof enrollmentStatuses)[number]

  @ApiProperty({
    description: 'Timestamp of when the enrollment status was created',
    example: new Date(),
  })
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the enrollment status was last updated',
    example: new Date(),
  })
  updatedAt: Date
}

export const ListEnrollmentStatusesSwaggerDto = () => {
  const name = 'ListEnrollmentStatuses'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'listEnrollmentStatuses',
      summary: 'Listar status da matrícula',
      description: 'Permite listar os possíveis status da matrícula no programa UPT',
    })(target, key, descriptor)
    ApiResponseOk('Status da matrícula no programa UPT', ListEnrollmentResponseSwaggerDto, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class ListEnrollmentResponseSwaggerDto {
  @ApiProperty({
    type: [EnrollmentStatusDto],
    description: 'List enrollment statuses',
  })
  results: EnrollmentStatusDto[]
}
