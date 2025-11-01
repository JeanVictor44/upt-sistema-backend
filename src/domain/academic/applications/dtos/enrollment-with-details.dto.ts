export interface EnrollmentWithDetailsDTO {
  id: number
  classEdition: {
    id: number
    enrolledCount: number
    class: {
      id: number
      name: string
    }
    edition: {
      id: number
      year: number
    }
    createdAt: Date
    updatedAt: Date
  }
  isExempt: boolean
  enrollmentDate: string
}
