import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { StudentStatus } from '@domain/resource/enterprise/interfaces/student-statuses'

import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<StudentStatus>[]>

@Injectable()
export class ListStudentStatusesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const classOptions = await this.resourceRepository.findAllStudentStatuses()

    return right(classOptions)
  }
}
