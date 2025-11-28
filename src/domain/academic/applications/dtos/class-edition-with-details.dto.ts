import { ClassWithDetailsDTO } from './class-with-details.dto'

export interface ClassEditionWithDetailsDTO {
  id: number
  enrolledCount: number
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
