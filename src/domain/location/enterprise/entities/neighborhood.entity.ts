import { AggregateRoot } from '@root/core/domain/aggregate-root'
import { Optional } from '@root/core/logic/Optional'

import { NeighborhoodProps } from '../interfaces/neighborhood'

export class Neighborhood extends AggregateRoot<NeighborhoodProps> {
  get name() {
    return this.props.name
  }

  get cityId(): number {
    return this.props.cityId
  }

  get regionId(): number {
    return this.props.regionId
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
        cityId: props.cityId,
        regionId: props.regionId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
