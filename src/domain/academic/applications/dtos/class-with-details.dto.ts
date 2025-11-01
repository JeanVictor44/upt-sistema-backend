export interface ClassWithDetailsDTO {
  id: number
  name: string
  shift: {
    id: number
    name: string
  }
  option: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
  }
  teachingPlace: {
    id: number
    name: string
    propertyLocationCategory: {
      id: number
      name: string
    }
    traditionalCommunityName?: string
    neighborhood: {
      id: number
      name: string
      city: {
        id: number
        name: string
      }
      region: {
        id: number
        name: string
      }
      createdAt: Date
      updatedAt: Date
    }
    createdAt: Date
    updatedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}
