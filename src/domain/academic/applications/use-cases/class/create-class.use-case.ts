import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { Class } from '@root/domain/academic/enterprise/entities/class.entity'

import { Either, left, right } from '@core/logic/Either'

import { ClassRepository } from '../../repositories/class-repository'

type InputProps = {
  name: string
  shiftId: number
  optionId: number
  teachingPlaceId: number
  statusId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class CreateClassUseCase {
  constructor(private readonly classRepository: ClassRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, optionId, shiftId, teachingPlaceId, statusId } = data

    const classExists = await this.classRepository.findByCompositeKeys({
      name,
      optionId,
      shiftId,
      teachingPlaceId,
    })

    if (classExists) return left(new ResourceAlreadyExistsError())

    const newClass = Class.create({
      name,
      optionId,
      shiftId,
      teachingPlaceId,
      statusId,
    })

    await this.classRepository.create(newClass)
    return right(null)
  }
}
