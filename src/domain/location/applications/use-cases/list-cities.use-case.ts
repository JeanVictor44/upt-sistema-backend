import { Injectable } from '@nestjs/common'

import { Either, right } from '@core/logic/Either'

import { City } from '@domain/location/enterprise/entities/city.entity'

import { CityRepository } from '../repositories/city.repository'

type OutputProps = Either<null, City[]>

@Injectable()
export class ListCitiesUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(): Promise<OutputProps> {
    const cities = await this.cityRepository.findAll()

    return right(cities)
  }
}
