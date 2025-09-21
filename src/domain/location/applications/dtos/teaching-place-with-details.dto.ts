export interface TeachingPlaceWithDetailsDTO {
  id: number
  name: string
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
