export type UserRoleProps = {
  userId: number
  roleId: number
  regionId?: number
  classEditionId?: number
  startDate: Date
  endDate: Date | null
  createdAt: Date
  updatedAt?: Date
}
