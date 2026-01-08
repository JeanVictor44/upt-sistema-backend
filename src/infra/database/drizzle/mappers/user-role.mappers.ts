import { UserRole } from '@root/domain/authentication/enterprise/entities/user-role.entity'

import { UserRoleSchemaInsertProps, UserRoleSchemaSelectProps } from '../schemas/user-role.schema'

export class UserRoleMappers {
  static toDomain(data: UserRoleSchemaSelectProps): UserRole {
    return UserRole.create(
      {
        userId: data.userId,
        roleId: data.roleId,
        teachingPlaceId: data.teachingPlaceId || undefined,
        regionId: data.regionId || undefined,
        startDate: data.startDate,
        endDate: data.endDate,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    )
  }

  static toPersistence(data: UserRole): UserRoleSchemaInsertProps {
    return {
      id: data.id,
      userId: data.userId,
      roleId: data.roleId,
      teachingPlaceId: data.teachingPlaceId,
      regionId: data.regionId,
      startDate: data.startDate,
      endDate: data.endDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }
}
