import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { ClassProps } from '../interfaces/class'

export class Class extends Entity<ClassProps> {
  get name() {
    return this.props.name
  }

  get teachingPlaceId() {
    return this.props.teachingPlaceId
  }

  set name(name: string) {
    this.props.name = name
  }

  set teachingPlaceId(teachingPlaceId: number) {
    this.props.teachingPlaceId = teachingPlaceId
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

  static create(props: Optional<ClassProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Class(
      {
        name: props.name,
        teachingPlaceId: props.teachingPlaceId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
