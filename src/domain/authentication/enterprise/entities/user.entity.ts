import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { UserProps } from '@domain/authentication/enterprise/interfaces/user'

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get document() {
    return this.props.document
  }

  set document(document: string) {
    this.props.document = document
  }

  get telephone() {
    return this.props.telephone
  }

  set telephone(telephone: string) {
    this.props.telephone = telephone
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get disabledAt(): Date | undefined {
    return this.props.disabledAt
  }

  set disabledAt(disabledAt: Date) {
    this.props.disabledAt = disabledAt
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

  static create(props: Optional<UserProps, 'createdAt' | 'disabledAt'>, id?: number) {
    return new User(
      {
        name: props.name,
        email: props.email,
        document: props.document,
        telephone: props.telephone,
        password: props.password,
        disabledAt: props.disabledAt,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
