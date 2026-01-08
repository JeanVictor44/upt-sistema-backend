import { User } from '@domain/authentication/enterprise/entities/user.entity'

import { UserSchemaInsertProps, UserSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class UserMappers {
  static toDomain(
    data: UserSchemaSelectProps & {
      role?: {
        id?: number
        name?: string
      }
      teachingPlace?: {
        id?: number
        name?: string
      }
      region?: {
        id?: number
        name?: string
      }
      rolesHistory?: {
        role?: string
        classEdition?: {
          id?: number
          name?: string
          year?: number
        }
        region?: {
          id?: number
          name?: string
        }
        startDate?: Date
        endDate?: Date
      }[]
    },
  ): User {
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
        rolesHistory: data.rolesHistory || [],
        role: data.role || undefined,
        teachingPlace: data.teachingPlace || undefined,
        region: data.region || undefined,
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
      disabledAt: data.disabledAt ? data.disabledAt : undefined,
      telephone: data.telephone,
      password: data.password,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
