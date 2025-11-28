import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { EnrollmentReportDTO } from '../../dtos/enrollment-report.dto'
import { EnrollmentQueryRepository } from '../../repositories/enrollment-query-repository'

type OutputProps = Either<null, EnrollmentReportDTO[]>

@Injectable()
export class ExportEnrollmentReportUseCase {
  constructor(private readonly enrollmentQueryRepository: EnrollmentQueryRepository) {}

  async execute(regionId: number): Promise<OutputProps> {
    const enrollments = await this.enrollmentQueryRepository.findEnrollmentsByRegion(regionId)

    return right(enrollments)
  }
}
