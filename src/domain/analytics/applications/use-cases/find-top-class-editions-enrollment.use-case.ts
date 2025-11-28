import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { TopClassEditionEnrollmentDTO } from '../dtos/top-class-edition.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, TopClassEditionEnrollmentDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindTopClassEditionsUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const topClassEditionsEnrollment = await this.analyticsQueryRepository.topClassEditionsEnrollment({
      editionId,
    })

    return right(topClassEditionsEnrollment)
  }
}
