import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { StudentEnrollmentProps } from '../interfaces/student-enrollment'

export class StudentEnrollment extends Entity<StudentEnrollmentProps> {
  get studentId() {
    return this.props.studentId
  }
  get enrollmentId() {
    return this.props.enrollmentId
  }

  set studentId(value: number) {
    this.props.studentId = value
    this.touch()
  }

  set enrollmentId(value: number) {
    this.props.enrollmentId = value
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get socialName() {
    return this.props.socialName
  }

  set socialName(value: string | undefined) {
    this.props.socialName = value
    this.touch()
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(value: string) {
    this.props.cpf = value
    this.touch()
  }

  get telephone() {
    return this.props.telephone
  }

  set telephone(value: string | undefined) {
    this.props.telephone = value
    this.touch()
  }

  get enrollmentStatus() {
    return this.props.enrollmentStatus
  }

  get enrollmentDate() {
    return this.props.enrollmentDate
  }

  get isExempt() {
    return this.props.isExempt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt || new Date()
  }

  touch() {
    this.props.updatedAt = new Date()
  }
  static create(props: Optional<StudentEnrollmentProps, 'createdAt' | 'updatedAt'>) {
    return new StudentEnrollment({
      name: props.name,
      socialName: props.socialName,
      cpf: props.cpf,
      telephone: props.telephone,
      enrollmentDate: props.enrollmentDate,
      enrollmentStatus: props.enrollmentStatus,
      enrollmentId: props.enrollmentId,
      studentId: props.studentId,
      isExempt: props.isExempt,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    })
  }
}
