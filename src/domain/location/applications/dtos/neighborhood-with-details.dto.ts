export interface NeighborhoodWithDetailsDTO {
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
