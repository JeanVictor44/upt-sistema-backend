import { Inject, Injectable } from '@nestjs/common'
import { UserRoleDetailsDTO } from '@root/domain/authentication/applications/dtos/user-role-details.dto'
import { UserRolesRepository } from '@root/domain/authentication/applications/repositories/user-role.repository'
import { UserRole } from '@root/domain/authentication/enterprise/entities/user-role.entity'
import { eq } from 'drizzle-orm'

import { AsyncMaybe } from '@core/logic/Maybe'

import { DATABASE_CONNECTION } from '@infra/database/drizzle/database-connection'
import { DrizzleDB } from '@infra/database/drizzle/types/drizzle'

import { UserRoleMappers } from '../mappers/user-role.mappers'
import { roleSchema, userSchema } from '../schemas'
import { userRoleSchema } from '../schemas/user-role.schema'

@Injectable()
export class DrizzleUserRole implements UserRolesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(userRole: UserRole): Promise<void> {
    await this.db.insert(userRoleSchema).values(UserRoleMappers.toPersistence(userRole))
  }

  async findActiveRoleByUserId(userId: number): AsyncMaybe<UserRole> {
    const userRole = await this.db.query.userRoleSchema.findFirst({
      where: (field, sql) => sql.and(sql.eq(field.userId, userId), sql.isNull(field.endDate)),
    })

    if (!userRole) return null

    return UserRoleMappers.toDomain(userRole)
  }

  async findHistoryManagersByRegion(regionId: number): Promise<UserRoleDetailsDTO[]> {
    const userRoles = await this.db
      .select({
        id: userRoleSchema.id,
        name: userSchema.name,
        startDate: userRoleSchema.startDate,
        endDate: userRoleSchema.endDate,
      })
      .from(userRoleSchema)
      .innerJoin(userSchema, eq(userRoleSchema.userId, userSchema.id))
      .innerJoin(roleSchema, eq(userRoleSchema.roleId, roleSchema.id))
      .where(eq(userRoleSchema.regionId, regionId))

    return userRoles.map((ur) => ({
      id: ur.id,
      name: ur.name,
      startDate: ur.startDate,
      endDate: ur.endDate,
    }))
  }
  async save(userRole: UserRole): Promise<void> {
    await this.db
      .update(userRoleSchema)
      .set(UserRoleMappers.toPersistence(userRole))
      .where(eq(userRoleSchema.id, userRole.id))
  }
}
