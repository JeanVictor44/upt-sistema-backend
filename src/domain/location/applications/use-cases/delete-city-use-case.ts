import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { CityRepository } from '../repositories/city.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const city = await this.cityRepository.findById(id)
    if (!city) return left(new ResourceNotFoundError())

    await this.cityRepository.delete(city.id)

    return right(null)
  }
}
