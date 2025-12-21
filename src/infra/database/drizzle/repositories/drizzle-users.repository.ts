import { Inject, Injectable } from '@nestjs/common'
import { and, eq, getTableColumns, isNull } from 'drizzle-orm'

import { AsyncMaybe } from '@core/logic/Maybe'

import { UsersRepository } from '@domain/authentication/applications/repositories/users.repository'
import { User } from '@domain/authentication/enterprise/entities/user.entity'

import { DATABASE_CONNECTION } from '@infra/database/drizzle/database-connection'
import {
  classEditionSchema,
  editionSchema,
  regionSchema,
  roleSchema,
  userRoleSchema,
  userSchema,
} from '@infra/database/drizzle/schemas'
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
      .select({
        user: getTableColumns(userSchema),
        user_role: {
          id: roleSchema.id,
          name: roleSchema.name,
        },
        classEdition: {
          id: classEditionSchema.id,
          year: editionSchema.year,
        },
        region: {
          id: regionSchema.id,
          name: regionSchema.name,
        },
      })
      .from(userSchema)
      .leftJoin(userRoleSchema, and(eq(userSchema.id, userRoleSchema.userId), isNull(userRoleSchema.endDate)))
      .leftJoin(classEditionSchema, eq(classEditionSchema.id, userRoleSchema.classEditionId))
      .leftJoin(editionSchema, eq(classEditionSchema.editionId, editionSchema.id))
      .leftJoin(regionSchema, eq(regionSchema.id, userRoleSchema.regionId))
      .leftJoin(roleSchema, eq(userRoleSchema.roleId, roleSchema.id))

    const usersWithHistory = await Promise.all(
      users.map(async ({ user, user_role, classEdition, region }) => {
        const rolesHistory = await this.db
          .select({
            role: roleSchema.name,
            classEdition: {
              id: classEditionSchema.id,
              year: editionSchema.year,
            },
            region: {
              id: regionSchema.id,
              name: regionSchema.name,
            },
            startDate: userRoleSchema.startDate,
            endDate: userRoleSchema.endDate,
          })
          .from(userRoleSchema)
          .innerJoin(roleSchema, eq(userRoleSchema.roleId, roleSchema.id))
          .leftJoin(classEditionSchema, eq(classEditionSchema.id, userRoleSchema.classEditionId))
          .leftJoin(editionSchema, eq(classEditionSchema.editionId, editionSchema.id))
          .leftJoin(regionSchema, eq(regionSchema.id, userRoleSchema.regionId))
          .where(eq(userRoleSchema.userId, user.id))

        return UserMappers.toDomain({
          ...user,
          role: {
            id: user_role?.id,
            name: user_role?.name,
          },
          classEdition: classEdition.id
            ? {
                id: classEdition.id || undefined,
                year: classEdition.year || undefined,
              }
            : undefined,
          region: region?.id
            ? {
                id: region.id,
                name: region.name,
              }
            : undefined,
          rolesHistory: rolesHistory.map((roleHistoryItem) => ({
            role: roleHistoryItem.role,
            classEdition: roleHistoryItem.classEdition.id
              ? {
                  id: roleHistoryItem.classEdition.id || undefined,
                  year: roleHistoryItem.classEdition.year || undefined,
                }
              : undefined,
            region: roleHistoryItem.region?.id
              ? {
                  id: roleHistoryItem.region.id,
                  name: roleHistoryItem.region.name,
                }
              : undefined,
            startDate: roleHistoryItem.startDate,
            endDate: roleHistoryItem.endDate || undefined,
          })),
        })
      }),
    )

    return usersWithHistory
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
    const userUpdated = await this.db
      .update(userSchema)
      .set({
        ...raw,
        disabledAt: raw.disabledAt ? raw.disabledAt : null,
      })
      .where(eq(userSchema.id, user.id))
      .returning()

    return UserMappers.toDomain(userUpdated[0])
  }
}
