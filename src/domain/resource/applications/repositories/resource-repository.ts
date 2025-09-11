import { Resource } from '@root/core/domain/resource'

import { ClassOption } from '../../enterprise/interfaces/class-options'

export abstract class ResourceRepository {
  abstract findAllClassOptions(): Promise<Resource<ClassOption>[]>
}
