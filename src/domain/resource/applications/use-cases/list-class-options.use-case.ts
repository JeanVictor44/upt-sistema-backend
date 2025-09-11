import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { ClassOption } from '../../enterprise/interfaces/class-options'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<ClassOption>[]>

@Injectable()
export class ListClassOptionsUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const classOptions = await this.resourceRepository.findAllClassOptions()

    return right(classOptions)
  }
}
