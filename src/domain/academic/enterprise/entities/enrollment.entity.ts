import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { EnrollmentProps } from '../interfaces/enrollment'

export class Enrollment extends Entity<EnrollmentProps> {
  get studentId() {
    return this.props.studentId
  }

  set studentId(value: number) {
    this.props.studentId = value
    this.touch()
  }

  get enrollmentDate() {
    return this.props.enrollmentDate
  }

  set enrollmentDate(value: string) {
    this.props.enrollmentDate = value
    this.touch()
  }

  get statusId() {
    return this.props.statusId
  }

  set statusId(value: number) {
    this.props.statusId = value
    this.touch()
  }

  get classEditionId() {
    return this.props.classEditionId
  }

  set classEditionId(value: number) {
    this.props.classEditionId = value
    this.touch()
  }

  get isExempt() {
    return this.props.isExempt
  }

  set isExempt(value: boolean) {
    this.props.isExempt = value
    this.touch()
  }

  public touch() {
    this.props.updatedAt = new Date()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<EnrollmentProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Enrollment(
      {
        classEditionId: props.classEditionId,
        enrollmentDate: props.enrollmentDate,
        isExempt: props.isExempt,
        statusId: props.statusId,
        studentId: props.studentId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
