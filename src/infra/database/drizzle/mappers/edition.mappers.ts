import { Edition } from '@root/domain/academic/enterprise/entities/edition.entity'

import { EditionSelectProps, EditionSchemaInsertProps } from '@infra/database/drizzle/schemas'

export class EditionMappers {
  static toDomain(data: EditionSelectProps): Edition {
    return Edition.create(
      {
        year: data.year,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: Edition): EditionSchemaInsertProps {
    return {
      id: data.id,
      year: data.year,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
