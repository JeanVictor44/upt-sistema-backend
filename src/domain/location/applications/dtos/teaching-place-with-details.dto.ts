export interface TeachingPlaceWithDetailsDTO {
  id: number
  name: string
  propertyLocationCategory: {
    id: number
    name: string
  }
  traditionalCommunityName?: string | undefined
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
