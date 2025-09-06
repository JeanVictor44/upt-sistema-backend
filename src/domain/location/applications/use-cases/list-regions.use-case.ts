import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { Region } from '@domain/location/enterprise/entities/region.entity'

import { RegionsRepository } from '../repositories/RegionsRepository'

type OutputProps = Either<null, Region[]>

@Injectable()
export class ListRegionsUseCase {
  constructor(private readonly regionsRepository: RegionsRepository) {}

  async execute(): Promise<OutputProps> {
    const regions = await this.regionsRepository.findAll()

    return right(regions)
  }
}
