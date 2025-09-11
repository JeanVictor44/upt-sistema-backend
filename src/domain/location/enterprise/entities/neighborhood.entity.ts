import { AggregateRoot } from '@root/core/domain/aggregate-root'
import { Optional } from '@root/core/logic/Optional'

import { NeighborhoodProps } from '../interfaces/neighborhood'
import { City } from './city.entity'
import { Region } from './region.entity'

export class Neighborhood extends AggregateRoot<NeighborhoodProps> {
  get name() {
    return this.props.name
  }

  get city(): City {
    return this.city
  }

  get region(): Region {
    return this.region
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

  static create(props: Optional<NeighborhoodProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Neighborhood(
      {
        name: props.name,
        city: props.city,
        region: props.region,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
