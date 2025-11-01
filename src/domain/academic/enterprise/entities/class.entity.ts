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

  get shiftId() {
    return this.props.shiftId
  }
  get optionId() {
    return this.props.optionId
  }
  get statusId() {
    return this.props.statusId
  }

  set name(name: string) {
    this.props.name = name
  }

  set teachingPlaceId(teachingPlaceId: number) {
    this.props.teachingPlaceId = teachingPlaceId
  }

  set shiftId(shiftId: number) {
    this.props.shiftId = shiftId
  }

  set optionId(optionId: number) {
    this.props.optionId = optionId
  }

  set statusId(statusId: number) {
    this.props.statusId = statusId
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
        optionId: props.optionId,
        shiftId: props.shiftId,
        statusId: props.statusId,
        teachingPlaceId: props.teachingPlaceId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
