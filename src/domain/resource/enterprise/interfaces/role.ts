export enum RolesEnum {
  ADMIN = 'ADMIN',
  REGION_MANAGER = 'REGION_MANAGER',
  SECRETARY = 'SECRETARY',
}

export const roles: Roles[] = Object.values(RolesEnum)
export type Roles = `${RolesEnum}`
