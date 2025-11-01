import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { ClassEditionProps } from '../interfaces/class-edition'

export class ClassEdition extends Entity<ClassEditionProps> {
  get classId() {
    return this.props.classId
  }
  get editionId() {
    return this.props.editionId
  }
  get enrolledCount() {
    return this.props.enrolledCount
  }

  set classId(classId: number) {
    this.props.classId = classId
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
        classId: props.classId,
        editionId: props.editionId,
        enrolledCount: props.enrolledCount,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
