import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { EnrollemntEvolutionDTO } from '../dtos/enrollment-evolution.dto'
import { AnalyticsQueryRepository } from '../repositories/analytics-repository-query'

type OutputProps = Either<null, EnrollemntEvolutionDTO[]>

interface InputProps {
  editionId?: number
}

@Injectable()
export class FindEnrollmentEvolutionUseCase {
  constructor(private readonly analyticsQueryRepository: AnalyticsQueryRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId } = data

    const enrollmentEvolution = await this.analyticsQueryRepository.enrollmentEvolution({
      editionId,
    })

    return right(enrollmentEvolution)
  }
}
