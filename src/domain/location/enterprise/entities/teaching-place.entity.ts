import { AggregateRoot } from '@root/core/domain/aggregate-root'
import { Optional } from '@root/core/logic/Optional'

import { TeachingPlaceProps } from '@domain/location/enterprise/interfaces/teaching-place'

export class TeachingPlace extends AggregateRoot<TeachingPlaceProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get propertyLocationCategoryId(): number {
    return this.props.propertyLocationCategoryId
  }

  set propertyLocationCategoryId(propertyLocationCategoryId: number) {
    this.props.propertyLocationCategoryId = propertyLocationCategoryId
    this.touch()
  }

  get traditionalCommunityName(): string | undefined {
    return this.props.traditionalCommunityName
  }

  set traditionalCommunityName(traditionalCommunityName: string | undefined) {
    this.props.traditionalCommunityName = traditionalCommunityName
    this.touch()
  }

  get neighborhoodId(): number {
    return this.props.neighborhoodId
  }

  set neighborhoodId(neighborhoodId: number) {
    this.props.neighborhoodId = neighborhoodId
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

  static create(props: Optional<TeachingPlaceProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new TeachingPlace(
      {
        name: props.name,
        neighborhoodId: props.neighborhoodId,
        propertyLocationCategoryId: props.propertyLocationCategoryId,
        traditionalCommunityName: props.traditionalCommunityName,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
