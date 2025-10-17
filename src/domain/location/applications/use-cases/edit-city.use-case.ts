import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { CityRepository } from '../repositories/city.repository'

type InputProps = {
  id: number
  name: string
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, id } = data

    const city = await this.cityRepository.findById(id)
    if (!city) return left(new ResourceNotFoundError())

    const cityAlreadyExists = await this.cityRepository.findByName(name)
    if (cityAlreadyExists && cityAlreadyExists.id !== city.id) return left(new ResourceAlreadyExistsError())

    city.name = name
    await this.cityRepository.save(city)

    return right(null)
  }
}
