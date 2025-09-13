import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { HighschoolStatus } from '@domain/resource/enterprise/interfaces/highschool-statuses'

import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<HighschoolStatus>[]>

@Injectable()
export class ListHighschoolStatusesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const classOptions = await this.resourceRepository.findAllHighschoolStatuses()

    return right(classOptions)
  }
}
