import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'

import { Either, left, right } from '@core/logic/Either'

import { City } from '@domain/location/enterprise/entities/city.entity'

import { CityRepository } from '../../repositories/city.repository'

type InputProps = {
  name: string
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateCityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name } = data

    const cityExists = await this.cityRepository.findByName(name)
    if (cityExists) return left(new ResourceAlreadyExistsError())

    const city = City.create({
      name,
    })
    await this.cityRepository.create(city)

    return right(null)
  }
}
