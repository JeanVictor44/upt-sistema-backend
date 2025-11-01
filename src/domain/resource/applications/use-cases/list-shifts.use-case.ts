import { Injectable } from '@nestjs/common'
import { Resource } from '@root/core/domain/resource'

import { Either, right } from '@core/logic/Either'

import { Shift } from '../../enterprise/interfaces/shift'
import { ResourceRepository } from '../repositories/resource-repository'

type OutputProps = Either<null, Resource<Shift>[]>

@Injectable()
export class ListShiftsUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<OutputProps> {
    const shifts = await this.resourceRepository.findAllShifts()

    return right(shifts)
  }
}
