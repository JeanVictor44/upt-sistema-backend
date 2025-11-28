import { EnrollmentReportDTO } from '../dtos/enrollment-report.dto'

export abstract class EnrollmentQueryRepository {
  abstract findEnrollmentsByRegion(regionId: number): Promise<EnrollmentReportDTO[]>
}
