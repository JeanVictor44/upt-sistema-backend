import { AsyncMaybe } from '@root/core/logic/Maybe'

import { Class } from '../../enterprise/entities/class.entity'

export interface FindByCompositeKeysProps {
  name: string
  teachingPlaceId: number
  shiftId: number
  optionId: number
}

export abstract class ClassRepository {
  abstract create(Class: Class): Promise<void>
  abstract findById(id: number): AsyncMaybe<Class>
  abstract findByCompositeKeys(data: FindByCompositeKeysProps): AsyncMaybe<Class>
  abstract save(Class: Class): Promise<void>
  abstract delete(id: number): Promise<void>
}
