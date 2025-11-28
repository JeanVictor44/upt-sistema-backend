export type UserProps = {
  name: string
  email: string
  document: string
  telephone: string
  password: string
  role?: {
    id?: number
    name?: string
  }
  classEdition?: {
    id?: number
    name?: string
    year?: number
  }
  region?: {
    id?: number
    name?: string
  }
  rolesHistory?: {
    role?: string
    classEdition?: {
      id?: number
      name?: string
      year?: number
    }
    region?: {
      id?: number
      name?: string
    }
    startDate?: Date
    endDate?: Date
  }[]
  disabledAt?: Date
  createdAt: Date
  updatedAt?: Date
}
