import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { DistributionByEthnicitytDTO } from '../dtos/distribution-by-ethnicity.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, DistributionByEthnicitytDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindDistributionByEthnicityUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const distributionByEthnicity = await this.analyticsQueryRepository.distributionByEthnicity({
      editionId,
    })

    return right(distributionByEthnicity)
  }
}
