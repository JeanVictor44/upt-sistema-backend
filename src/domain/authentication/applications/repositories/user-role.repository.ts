import { AsyncMaybe } from '@core/logic/Maybe'

import { UserRole } from '../../enterprise/entities/user-role.entity'
import { UserRoleDetailsDTO } from '../dtos/user-role-details.dto'

export abstract class UserRolesRepository {
  abstract findActiveRoleByUserId(userId: number): AsyncMaybe<UserRole>
  abstract create(userRole: UserRole): Promise<void>
  abstract save(userRole: UserRole): Promise<void>
  abstract findHistoryManagersByRegion(regionId: number): Promise<UserRoleDetailsDTO[]>
}
