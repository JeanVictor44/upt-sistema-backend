import { AsyncMaybe } from '@core/logic/Maybe'

import { User } from '@domain/authentication/enterprise/entities/user.entity'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(id: number): AsyncMaybe<User>
  abstract findByEmail(email: string): AsyncMaybe<User>
  abstract findByDocument(document: string): AsyncMaybe<User>
  abstract save(user: User): Promise<void>
}
