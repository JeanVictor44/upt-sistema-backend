import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { DistributionByShiftDTO } from '../dtos/distribution-by-shift.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, DistributionByShiftDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindDistributionByShiftUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const distributionByShift = await this.analyticsQueryRepository.distributionByShift({
      editionId,
    })

    return right(distributionByShift)
  }
}
