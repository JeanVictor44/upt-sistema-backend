import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ClassEdition } from '@root/domain/academic/enterprise/entities/class-edition.entity'

import { Either, left, right } from '@core/logic/Either'

import { ClassEditionRepository } from '../../repositories/class-edition-repository'

type InputProps = {
  editionId: number
  enrolledCount: number
  optionId: number
  shiftId: number
  statusId: number
  teachingPlaceId: number
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateClassEditionUseCase {
  constructor(private readonly classEditionRepository: ClassEditionRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { editionId, enrolledCount, optionId, shiftId, statusId, teachingPlaceId } = data

    const classEditionExists = await this.classEditionRepository.findByCompositeKeys({
      teachingPlaceId,
      editionId,
      optionId,
    })
    if (classEditionExists) return left(new ResourceAlreadyExistsError())

    const classEdition = ClassEdition.create({
      editionId,
      enrolledCount,
      optionId,
      shiftId,
      statusId,
      teachingPlaceId,
    })
    await this.classEditionRepository.create(classEdition)

    return right(null)
  }
}
