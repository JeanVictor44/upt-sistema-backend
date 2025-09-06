import { RefreshToken } from '@root/domain/authentication/enterprise/entities/refresh-token.entity'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { RefreshTokenSchemaInsertProps, RefreshTokenSchemaSelectProps } from '../schemas/refresh-token.schema'

export class RefreshTokenMappers {
  static toDomain(data: RefreshTokenSchemaSelectProps): RefreshToken {
    return RefreshToken.create(
      {
        token: data.token,
        userId: data.userId,
        expiresAt: new Date(data.expiresAt),
        createdAt: new Date(data.createdAt),
      },
      new UniqueEntityID(data.id),
    )
  }

  static toPersistence(data: RefreshToken): RefreshTokenSchemaInsertProps {
    return {
      id: data.id.toValue(),
      userId: data.userId,
      token: data.token,
      expiresAt: data.expirestAt,
      createdAt: new Date(data.createdAt),
    }
  }
}
