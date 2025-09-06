import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, left, right } from '@core/logic/Either'

import { Region } from '@domain/location/enterprise/entities/region.entity'

import { RegionsRepository } from '../repositories/RegionsRepository'

type InputProps = {
  name: string
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateRegionUseCase {
  constructor(private readonly regionsRepository: RegionsRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name } = data

    const regionExists = await this.regionsRepository.findByName(name)
    if (regionExists) return left(new ResourceAlreadyExistsError())

    const region = Region.create({
      name,
    })
    await this.regionsRepository.create(region)

    return right(null)
  }
}
