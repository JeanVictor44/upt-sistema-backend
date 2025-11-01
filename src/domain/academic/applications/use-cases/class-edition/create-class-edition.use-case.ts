import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ClassEdition } from '@root/domain/academic/enterprise/entities/class-edition.entity'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionRepository } from '../../repositories/class-edition-repository'

type InputProps = {
  editionId: number
  classId: number
  enrolledCount: number
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateClassEditionUseCase {
  constructor(private readonly classEditionRepository: ClassEditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { classId, editionId, enrolledCount } = data

    const classEditionExists = await this.classEditionRepository.findByCompositeKeys({
      classId,
      editionId,
    })
    if (classEditionExists) return left(new ResourceAlreadyExistsError())

    const classEdition = ClassEdition.create({
      classId,
      editionId,
      enrolledCount,
    })
    await this.classEditionRepository.create(classEdition)

    return right(null)
  }
}
