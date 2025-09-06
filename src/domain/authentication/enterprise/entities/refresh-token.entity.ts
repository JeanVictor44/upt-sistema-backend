import { Optional } from '@root/core/logic/Optional'

import { Entity } from '@core/domain/Entity'
import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { RefreshTokenProps } from '@domain/authentication/enterprise/interfaces/refresh-token'

export class RefreshToken extends Entity<RefreshTokenProps> {
  get token() {
    return this.props.token
  }

  get expirestAt() {
    return this.props.expiresAt
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<RefreshTokenProps, 'expiresAt' | 'createdAt'>, id?: UniqueEntityID) {
    return new RefreshToken(
      {
        token: props.token,
        userId: props.userId,
        expiresAt: props.expiresAt || new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        createdAt: props.createdAt || new Date(),
      },
      id,
    )
  }
}
