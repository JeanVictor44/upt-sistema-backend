import { Entity } from '@root/core/domain/Entity'

import { UniqueEntityID } from '@core/domain/unique-entity-id'
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

  get role() {
    return this.props.role
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

  get disabledAt() {
    return this.props.disabledAt
  }

  set disabledAt(disabledAt: Date | null) {
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

  static create(props: Optional<UserProps, 'createdAt' | 'disabledAt'>, id?: UniqueEntityID) {
    return new User(
      {
        name: props.name,
        email: props.email,
        document: props.document,
        telephone: props.telephone,
        role: props.role,
        password: props.password,
        disabledAt: props.disabledAt || null,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
