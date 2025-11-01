import { ClassWithDetailsDTO } from './class-with-details.dto'

export interface ClassEditionWithDetailsDTO {
  id: number
  enrolledCount: number
  class: ClassWithDetailsDTO
  edition: {
    id: number
    year: number
    createdAt: Date
    updatedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}
