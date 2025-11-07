export type UserProps = {
  name: string
  email: string
  document: string
  telephone: string
  password: string
  roleId?: number
  classEditionId?: number
  regionId?: number
  disabledAt?: Date
  createdAt: Date
  updatedAt?: Date
}
