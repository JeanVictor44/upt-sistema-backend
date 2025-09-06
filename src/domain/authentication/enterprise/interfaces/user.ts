export enum UserRole {
  ADMIN = 'ADMIN',
  REGION_MANAGER = 'REGION_MANAGER',
  SECRETARY = 'SECRETARY',
}

export type UserProps = {
  name: string
  email: string
  document: string
  telephone: string
  password: string
  role: UserRole
  disabledAt: Date | null
  createdAt: Date
  updatedAt?: Date
}
