import { Optional } from '@root/core/logic/Optional'

import { Entity } from '@core/domain/Entity'
import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { RegionProps } from '@domain/location/enterprise/interfaces/region'

export class Region extends Entity<RegionProps> {
  get name() {
    return this.props.name
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

  static create(props: Optional<RegionProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID) {
    return new Region(
      {
        name: props.name,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
