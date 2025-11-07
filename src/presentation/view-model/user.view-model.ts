import { User } from '@root/domain/authentication/enterprise/entities/user.entity'

export class UserViewModel {
  static toHttpWithDetails(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      telephone: user.telephone,
      roleId: user.props.roleId,
      classEditionId: user.props.classEditionId,
      regionId: user.props.regionId,
      disabledAt: user.disabledAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      telephone: user.telephone,
      disabledAt: user.disabledAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
