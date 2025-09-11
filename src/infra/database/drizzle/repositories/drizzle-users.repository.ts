import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

import { DomainEvents } from '@core/events/domain-events'
import { AsyncMaybe } from '@core/logic/Maybe'

import { UsersRepository } from '@domain/authentication/applications/repositories/users.repository'
import { User } from '@domain/authentication/enterprise/entities/user.entity'

import { DATABASE_CONNECTION } from '@infra/database/drizzle/database-connection'
import { userSchema } from '@infra/database/drizzle/schemas'
import { DrizzleDB } from '@infra/database/drizzle/types/drizzle'

import { UserMappers } from '../mappers/users.mappers'

@Injectable()
export class DrizzleUsersRepository implements UsersRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(data: User): Promise<void> {
    const preparedData = UserMappers.toPersistence(data)
    await this.db.insert(userSchema).values(preparedData)
  }

  async findById(id: number): AsyncMaybe<User> {
    const user = await this.db.query.userSchema.findFirst({
      where: (field, sql) => sql.eq(field.id, id),
    })

    if (!user) return null

    return UserMappers.toDomain(user)
  }

  async findByDocument(document: string): AsyncMaybe<User> {
    const user = await this.db.query.userSchema.findFirst({
      where: (field, sql) => sql.eq(field.document, document),
    })

    if (!user) return null

    return UserMappers.toDomain(user)
  }

  async findByEmail(email: string): AsyncMaybe<User> {
    const user = await this.db.query.userSchema.findFirst({
      where: (field, sql) => sql.eq(field.email, email),
    })

    if (!user) return null

    return UserMappers.toDomain(user)
  }

  async save(user: User): Promise<void> {
    const raw = UserMappers.toPersistence(user)
    await this.db.update(userSchema).set(raw).where(eq(userSchema.id, user.id))

    DomainEvents.dispatchEventsForAggregate(user.id)
  }
}
