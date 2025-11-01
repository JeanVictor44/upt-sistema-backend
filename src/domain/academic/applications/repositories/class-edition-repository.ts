import { AsyncMaybe } from '@root/core/logic/Maybe'

import { ClassEdition } from '../../enterprise/entities/class-edition.entity'

export interface FindByCompositeKeysProps {
  classId: number
  editionId: number
}

export abstract class ClassEditionRepository {
  abstract create(edition: ClassEdition): Promise<void>
  abstract findByCompositeKeys(data: FindByCompositeKeysProps): AsyncMaybe<ClassEdition>
  abstract findById(id: number): AsyncMaybe<ClassEdition>
  abstract findAll(): Promise<ClassEdition[]>
  abstract save(edition: ClassEdition): Promise<void>
  abstract delete(id: number): Promise<void>
}
