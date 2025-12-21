export interface EnrollmentWithDetailsDTO {
  id: number
  statusId: number
  classEdition: {
    id: number
    enrolledCount: number
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
