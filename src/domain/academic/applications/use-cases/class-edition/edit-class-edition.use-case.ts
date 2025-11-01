import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionRepository } from '../../repositories/class-edition-repository'

type InputProps = {
  id: number
  editionId: number
  classId: number
  enrolledCount: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditClassEditionUseCase {
  constructor(private readonly classEditionRepository: ClassEditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { classId, editionId, enrolledCount, id } = data

    const classEdition = await this.classEditionRepository.findById(id)
    if (!classEdition) return left(new ResourceNotFoundError())

    const classEditionAlreadyExists = await this.classEditionRepository.findByCompositeKeys({
      classId,
      editionId,
    })
    if (classEditionAlreadyExists && classEditionAlreadyExists.id !== classEdition.id)
      return left(new ResourceAlreadyExistsError())

    classEdition.classId = classId
    classEdition.editionId = editionId
    classEdition.enrolledCount = enrolledCount

    await this.classEditionRepository.save(classEdition)
    return right(null)
  }
}
