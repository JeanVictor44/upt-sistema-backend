import { Optional } from '@root/core/logic/Optional'

import { Entity } from '@core/domain/Entity'

import { AddressProps } from '../interfaces/address'

export class Address extends Entity<AddressProps> {
  get street() {
    return this.props.street
  }
  set street(street: string | undefined) {
    this.props.street = street
    this.touch()
  }

  get number() {
    return this.props.number
  }

  set number(number: number | undefined) {
    this.props.number = number
    this.touch()
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string | undefined) {
    this.props.neighborhood = neighborhood
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string | undefined) {
    this.props.city = city
    this.touch()
  }

  get zipCode() {
    return this.props.zipCode
  }

  set zipCode(zipCode: string | undefined) {
    this.props.zipCode = zipCode
    this.touch()
  }

  get propertyLocationCategoryId() {
    return this.props.propertyLocationCategoryId
  }

  set propertyLocationCategoryId(propertyLocationCategoryId: number | undefined) {
    this.props.propertyLocationCategoryId = propertyLocationCategoryId
    this.touch()
  }

  get traditionalCommunityName() {
    return this.props.traditionalCommunityName
  }

  set traditionalCommunityName(traditionalCommunityName: string | undefined) {
    this.props.traditionalCommunityName = traditionalCommunityName
    this.touch()
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

  static create(props: Optional<AddressProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new Address(
      {
        city: props.city,
        neighborhood: props.neighborhood,
        number: props.number,
        propertyLocationCategoryId: props.propertyLocationCategoryId,
        street: props.street,
        traditionalCommunityName: props.traditionalCommunityName,
        zipCode: props.zipCode,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
