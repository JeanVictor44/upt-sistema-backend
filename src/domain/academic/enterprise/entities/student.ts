import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { StudentProps } from '../interfaces/student'

export class Student extends Entity<StudentProps> {
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

  get rg() {
    return this.props.rg
  }

  set rg(value: string | undefined) {
    this.props.rg = value
    this.touch()
  }

  get dateBirth() {
    return this.props.dateBirth
  }

  set dateBirth(value: string | undefined) {
    this.props.dateBirth = value
    this.touch()
  }

  get telephone() {
    return this.props.telephone
  }

  set telephone(value: string | undefined) {
    this.props.telephone = value
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(value: string | undefined) {
    this.props.email = value
    this.touch()
  }

  get addressId() {
    return this.props.addressId
  }

  set addressId(value: number | undefined) {
    this.props.addressId = value
    this.touch()
  }

  get genderIdentityId() {
    return this.props.genderIdentityId
  }

  set genderIdentityId(value: number) {
    this.props.genderIdentityId = value
    this.touch()
  }

  get ethnicityId() {
    return this.props.ethnicityId
  }

  set ethnicityId(value: number) {
    this.props.ethnicityId = value
    this.touch()
  }

  get highSchoolStatusId() {
    return this.props.highSchoolStatusId
  }

  set highSchoolStatusId(value: number) {
    this.props.highSchoolStatusId = value
    this.touch()
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
  static create(props: Optional<StudentProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Student(
      {
        ethnicityId: props.ethnicityId,
        genderIdentityId: props.genderIdentityId,
        name: props.name,
        socialName: props.socialName,
        cpf: props.cpf,
        rg: props.rg,
        dateBirth: props.dateBirth,
        telephone: props.telephone,
        email: props.email,
        addressId: props.addressId,
        highSchoolStatusId: props.highSchoolStatusId,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
