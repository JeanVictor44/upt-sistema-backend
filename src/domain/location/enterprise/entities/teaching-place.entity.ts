import { AggregateRoot } from '@root/core/domain/aggregate-root'
import { Optional } from '@root/core/logic/Optional'

import { TeachingPlaceProps } from '@domain/location/enterprise/interfaces/teaching-place'

import { Neighborhood } from './neighborhood.entity'

export class TeachingPlace extends AggregateRoot<TeachingPlaceProps> {
  get name() {
    return this.props.name
  }

  get neighborhood(): Neighborhood {
    return this.neighborhood
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

  static create(props: Optional<TeachingPlaceProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new TeachingPlace(
      {
        name: props.name,
        neighborhood: props.neighborhood,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
