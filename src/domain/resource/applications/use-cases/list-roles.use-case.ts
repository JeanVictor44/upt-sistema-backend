import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { Roles } from '../../enterprise/interfaces/role'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<Roles>[]>

@Injectable()
export class ListRolesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const roles = await this.resourceRepository.findAllRoles()

    return right(roles)
  }
}
