import { User } from '@root/domain/authentication/enterprise/entities/user.entity'

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      telephone: user.telephone,
      disableAt: user.disabledAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
