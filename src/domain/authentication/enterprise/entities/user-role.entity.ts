import { Entity } from '@root/core/domain/Entity'

import { Optional } from '@core/logic/Optional'

import { UserRoleProps } from '../interfaces/user-role'

export class UserRole extends Entity<UserRoleProps> {
  get userId() {
    return this.props.userId
  }

  get roleId() {
    return this.props.roleId
  }

  get regionId() {
    return this.props.regionId
  }

  get classEditionId() {
    return this.props.classEditionId
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt || new Date()
  }

  expireUserRole() {
    this.props.endDate = new Date()
  }

  public touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserRoleProps, 'createdAt' | 'updatedAt'>, id?: number) {
    return new UserRole(
      {
        userId: props.userId,
        roleId: props.roleId,
        regionId: props.regionId,
        classEditionId: props.classEditionId,
        startDate: props.startDate,
        endDate: props.endDate,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    )
  }
}
