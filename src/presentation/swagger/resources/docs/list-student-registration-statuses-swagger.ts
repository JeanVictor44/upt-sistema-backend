import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import { enrollmentStatuses } from '@root/domain/resource/enterprise/interfaces/enrollment-status'
import { ApiResponseOk, BadRequestResponseDto } from '@utils/swagger-api-response'

import { createResourceDto } from '../entities/resource.dto'

const ListEnrollmentStatusDto = createResourceDto(enrollmentStatuses, 'Enrollment status', 'EnrollmentStatusDto')

export const ListEnrollmentStatusesSwaggerDto = () => {
  const name = 'ListEnrollmentStatusesSwaggerDto'

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

type EnrollmentStatusDtoType = InstanceType<typeof ListEnrollmentStatusDto>

export class ListEnrollmentResponseSwaggerDto {
  @ApiProperty({
    type: [ListEnrollmentStatusDto],
    description: 'List enrollment statuses',
  })
  results: EnrollmentStatusDtoType[]
}
