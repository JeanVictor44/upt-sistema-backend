import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { ClassRepository } from '../../repositories/class-repository'

type InputProps = {
  id: number
  name: string
  teachingPlaceId: number
}

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditClassUseCase {
  constructor(private readonly classRepository: ClassRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { name, id, teachingPlaceId } = data

    const classResult = await this.classRepository.findById(id)
    if (!classResult) return left(new ResourceNotFoundError())

    const classAlreadyExists = await this.classRepository.findByCompositeKeys({
      name,
      teachingPlaceId,
    })
    if (classAlreadyExists && classAlreadyExists.id !== classResult.id) return left(new ResourceAlreadyExistsError())

    classResult.name = name
    classResult.teachingPlaceId = teachingPlaceId

    await this.classRepository.save(classResult)

    return right(null)
  }
}
