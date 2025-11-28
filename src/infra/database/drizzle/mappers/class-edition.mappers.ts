import { ClassEdition } from '@root/domain/academic/enterprise/entities/class-edition.entity'

import { ClassEditionSchemaSelectProps, ClassEditionSchemaSchemaInsertProps } from '@infra/database/drizzle/schemas'

export class ClassEditionMappers {
  static toDomain(data: ClassEditionSchemaSelectProps): ClassEdition {
    return ClassEdition.create(
      {
        classId: data.classId,
        editionId: data.editionId,
        optionId: data.optionId,
        shiftId: data.shiftId,
        statusId: data.statusId,
        enrolledCount: data.enrolledCount,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: ClassEdition): ClassEditionSchemaSchemaInsertProps {
    return {
      id: data.id,
      classId: data.classId,
      editionId: data.editionId,
      optionId: data.optionId,
      shiftId: data.shiftId,
      statusId: data.statusId,
      enrolledCount: data.enrolledCount,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
