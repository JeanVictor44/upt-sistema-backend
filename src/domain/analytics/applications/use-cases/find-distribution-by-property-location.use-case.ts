import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { DistributionByPropertyLocationtDTO } from '../dtos/distribution-by-property-location.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, DistributionByPropertyLocationtDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindDistributionByPropertyLocationUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const distributionByPropertyLocation = await this.analyticsQueryRepository.distributionByPropertyLocation({
      editionId,
    })

    return right(distributionByPropertyLocation)
  }
}
