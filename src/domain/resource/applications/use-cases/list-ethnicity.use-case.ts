import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { Ethnicities } from '../../enterprise/interfaces/ethnicity'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<Ethnicities>[]>

@Injectable()
export class ListEthnicitiesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const ethnicities = await this.resourceRepository.findAllEthnicities()

    return right(ethnicities)
  }
}
