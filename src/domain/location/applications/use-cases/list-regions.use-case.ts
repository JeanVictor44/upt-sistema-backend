import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { Region } from '@domain/location/enterprise/entities/region.entity'

import { RegionRepository } from '../repositories/region.repository'

type OutputProps = Either<null, Region[]>

@Injectable()
export class ListRegionsUseCase {
  constructor(private readonly regionsRepository: RegionRepository) {}

  async execute(): Promise<OutputProps> {
    const regions = await this.regionsRepository.findAll()

    return right(regions)
  }
}
