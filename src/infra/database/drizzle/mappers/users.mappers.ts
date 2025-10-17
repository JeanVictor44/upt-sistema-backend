import { User } from '@domain/authentication/enterprise/entities/user.entity'

import { UserSchemaInsertProps, UserSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class UserMappers {
  static toDomain(data: UserSchemaSelectProps): User {
    return User.create(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        document: data.document,
        disabledAt: data.disabledAt || undefined,
        telephone: data.telephone,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: User): UserSchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      document: data.document,
      disabledAt: data.disabledAt,
      telephone: data.telephone,
      password: data.password,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
