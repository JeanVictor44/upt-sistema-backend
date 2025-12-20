import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { StudentAttendanceProps } from '../interfaces/student-attendance'

export class StudentAttendance extends Entity<StudentAttendanceProps> {
  get enrollmentId() {
    return this.props.enrollmentId
  }

  set enrollmentId(value: number) {
    this.props.enrollmentId = value
  }

  get isPresent() {
    return this.props.isPresent
  }

  set isPresent(value: boolean) {
    this.props.isPresent = value
    this.touch()
  }

  get markedAt() {
    return this.props.markedAt
  }

  set markedAt(value: Date) {
    this.props.markedAt = value
    this.touch()
  }

  get markedByUserId() {
    return this.props.markedByUserId
  }

  set markedByUserId(value: number) {
    this.props.markedByUserId = value
    this.touch()
  }

  get month() {
    return this.props.month
  }

  set month(value: number) {
    this.props.month = value
  }

  get year() {
    return this.props.year
  }

  set year(value: number) {
    this.props.year = value
  }

  get updatedAt() {
    return this.props.updatedAt || new Date()
  }

  public touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<StudentAttendanceProps, 'updatedAt'>, id?: number) {
    return new StudentAttendance(
      {
        enrollmentId: props.enrollmentId,
        year: props.year,
        month: props.month,
        isPresent: props.isPresent,
        markedByUserId: props.markedByUserId,
        markedAt: props.markedAt,
        updatedAt: props.updatedAt,
      },
      id,
    )
  }
}
