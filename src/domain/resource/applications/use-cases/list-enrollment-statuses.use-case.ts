import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'
import { EnrollmentStatus } from '@root/domain/resource/enterprise/interfaces/enrollment-status'

import { Either, right } from '@core/logic/Either'

import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<EnrollmentStatus>[]>

@Injectable()
export class ListEnrollmentStatusesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const classOptions = await this.resourceRepository.findAllEnrollmentStatuses()

    return right(classOptions)
  }
}
