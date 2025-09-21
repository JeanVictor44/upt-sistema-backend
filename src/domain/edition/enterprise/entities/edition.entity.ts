import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { EditionProps } from '@domain/edition/enterprise/interfaces/edition'

export class Edition extends Entity<EditionProps> {
  get year() {
    return this.props.year
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt || new Date()
  }

  public touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<EditionProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Edition(
      {
        year: props.year,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
