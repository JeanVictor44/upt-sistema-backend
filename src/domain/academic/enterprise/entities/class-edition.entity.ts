import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { ClassEditionProps } from '../interfaces/class-edition'

export class ClassEdition extends Entity<ClassEditionProps> {
  get teachingPlaceId() {
    return this.props.teachingPlaceId
  }

  get editionId() {
    return this.props.editionId
  }
  get enrolledCount() {
    return this.props.enrolledCount
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

  set shiftId(shiftId: number) {
    this.props.shiftId = shiftId
  }

  set teachingPlaceId(teachingPlaceId: number) {
    this.props.teachingPlaceId = teachingPlaceId
  }

  set optionId(optionId: number) {
    this.props.optionId = optionId
  }

  set statusId(statusId: number) {
    this.props.statusId = statusId
  }

  set editionId(editionId: number) {
    this.props.editionId = editionId
  }

  set enrolledCount(enrolledCount: number) {
    this.props.enrolledCount = enrolledCount
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

  static create(props: Optional<ClassEditionProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new ClassEdition(
      {
        teachingPlaceId: props.teachingPlaceId,
        editionId: props.editionId,
        enrolledCount: props.enrolledCount,
        optionId: props.optionId,
        shiftId: props.shiftId,
        statusId: props.statusId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
