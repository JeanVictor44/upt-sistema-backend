import { Roles } from '@root/domain/resource/enterprise/interfaces/role'
import { roles } from '@root/infra/database/drizzle/schemas'

export function convertRoleIdToName(roleId: number): Roles {
  const roleName = roles.enumValues[roleId - 1]

  return roleName
}
