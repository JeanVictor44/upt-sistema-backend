import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionRepository } from '../../repositories/class-edition-repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteClassEditionUseCase {
  constructor(private readonly classEditionRepository: ClassEditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const classEdition = await this.classEditionRepository.findById(id)
    if (!classEdition) return left(new ResourceNotFoundError())

    await this.classEditionRepository.delete(classEdition.id)

    return right(null)
  }
}
