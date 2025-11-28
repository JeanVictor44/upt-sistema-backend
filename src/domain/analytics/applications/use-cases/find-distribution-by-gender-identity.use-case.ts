import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { DistributionByGenderIdentitytDTO } from '../dtos/distribution-by-gender-identity.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, DistributionByGenderIdentitytDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindDistributionByGenderIdentityUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const distributionByGenderIdentity = await this.analyticsQueryRepository.distributionByGenderIdentity({
      editionId,
    })

    return right(distributionByGenderIdentity)
  }
}
