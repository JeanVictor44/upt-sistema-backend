import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { BigNumbersDto } from '../dtos/big-numbers.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, BigNumbersDto>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindBigNumbersUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const bigNumbers = await this.analyticsQueryRepository.findBigNumbers({
      editionId,
    })

    return right(bigNumbers)
  }
}
