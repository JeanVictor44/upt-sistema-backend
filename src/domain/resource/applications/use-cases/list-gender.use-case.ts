import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { GenderIdentities } from '../../enterprise/interfaces/gender-identity'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<GenderIdentities>[]>

@Injectable()
export class ListGenderIdentitiesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const genderIdentities = await this.resourceRepository.findAllGenders()

    return right(genderIdentities)
  }
}
