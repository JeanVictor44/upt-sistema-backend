import { Class } from '@root/domain/academic/enterprise/entities/class.entity'

import { ClassSchemaInsertProps, ClassSelectProps } from '../schemas'

export class ClassMappers {
  static toDomain(data: ClassSelectProps): Class {
    return Class.create(
      {
        name: data.name,
        teachingPlaceId: data.teachingPlaceId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: Class): ClassSchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      teachingPlaceId: data.teachingPlaceId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
