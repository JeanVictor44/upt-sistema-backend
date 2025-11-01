import { Entity } from '@root/core/domain/Entity'
import { EditionProps } from '@root/domain/academic/enterprise/interfaces/edition'

import { Optional } from '@core/logic/Optional'

export class Edition extends Entity<EditionProps> {
  get year() {
    return this.props.year
  }

  set year(year: number) {
    this.props.year = year
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
