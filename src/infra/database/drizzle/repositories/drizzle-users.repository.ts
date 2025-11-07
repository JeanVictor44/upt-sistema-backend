import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

import { AsyncMaybe } from '@core/logic/Maybe'

import { UsersRepository } from '@domain/authentication/applications/repositories/users.repository'
import { User } from '@domain/authentication/enterprise/entities/user.entity'

import { DATABASE_CONNECTION } from '@infra/database/drizzle/database-connection'
import { userRoleSchema, userSchema } from '@infra/database/drizzle/schemas'
import { DrizzleDB } from '@infra/database/drizzle/types/drizzle'

import { UserMappers } from '../mappers/users.mappers'

@Injectable()
export class DrizzleUsersRepository implements UsersRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(data: User): Promise<User> {
    const preparedData = UserMappers.toPersistence(data)
    const user = await this.db.insert(userSchema).values(preparedData).returning()

    return UserMappers.toDomain(user[0])
  }

  async findAll(): Promise<User[]> {
    const users = await this.db
      .select()
      .from(userSchema)
      .innerJoin(userRoleSchema, eq(userSchema.id, userRoleSchema.userId))

    return users.map(({ user, user_role }) =>
      UserMappers.toDomain({
        ...user,
        roleId: user_role.roleId,
        classEditionId: user_role.classEditionId,
        regionId: user_role.regionId,
      }),
    )
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

  async save(user: User): Promise<User> {
    const raw = UserMappers.toPersistence(user)
    const userUpdated = await this.db.update(userSchema).set(raw).where(eq(userSchema.id, user.id)).returning()

    return UserMappers.toDomain(userUpdated[0])
  }
}
