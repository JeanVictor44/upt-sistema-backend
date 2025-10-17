import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { RegionRepository } from '../repositories/region.repository'

type InputProps = {
  id: number
  name: string
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditRegionUseCase {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, id } = data

    const region = await this.regionRepository.findById(id)
    if (!region) return left(new ResourceNotFoundError())

    const regionAlreadyExists = await this.regionRepository.findByName(name)
    if (regionAlreadyExists && regionAlreadyExists.id !== region.id) return left(new ResourceAlreadyExistsError())

    region.name = name
    await this.regionRepository.save(region)

    return right(null)
  }
}
