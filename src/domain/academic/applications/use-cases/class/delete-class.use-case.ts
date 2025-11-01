import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { ClassRepository } from '../../repositories/class-repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteClassUseCase {
  constructor(private readonly classRepository: ClassRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const classResult = await this.classRepository.findById(id)
    if (!classResult) return left(new ResourceNotFoundError())

    await this.classRepository.delete(classResult.id)

    return right(null)
  }
}
