import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { PropertyLocationCategory } from '../../enterprise/interfaces/property-location-category'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<PropertyLocationCategory>[]>

@Injectable()
export class ListPropertyLocationsUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const propertyLocations = await this.resourceRepository.findAllPropertyLocations()

    return right(propertyLocations)
  }
}
