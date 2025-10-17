import { AsyncMaybe } from '@core/logic/Maybe'

import { UserRole } from '../../enterprise/entities/user-role.entity'

export abstract class UserRolesRepository {
  abstract findActiveRoleByUserId(userId: number): AsyncMaybe<UserRole>
  abstract create(userRole: UserRole): Promise<void>
  abstract save(userRole: UserRole): Promise<void>
}
