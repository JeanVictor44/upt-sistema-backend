import { Optional } from '@root/core/logic/Optional'

import { Entity } from '@core/domain/Entity'

import { CityProps } from '../interfaces/city'

export class City extends Entity<CityProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
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

  static create(props: Optional<CityProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new City(
      {
        name: props.name,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
