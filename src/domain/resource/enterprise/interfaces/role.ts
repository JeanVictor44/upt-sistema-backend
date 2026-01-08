export enum RolesEnum {
  ADMIN = 'ADMIN',
  INTERIOR_MANAGER = 'INTERIOR_MANAGER',
  CAPITAL_MANAGER = 'CAPITAL_MANAGER',
  SECRETARY = 'SECRETARY',
}

export const roles: Roles[] = Object.values(RolesEnum)
export type Roles = `${RolesEnum}`
