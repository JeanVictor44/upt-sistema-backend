import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { ClassStatus } from '@domain/resource/enterprise/interfaces/class-statuses'

import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<ClassStatus>[]>

@Injectable()
export class ListClassStatusesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const classOptions = await this.resourceRepository.findAllClassStatuses()

    return right(classOptions)
  }
}
