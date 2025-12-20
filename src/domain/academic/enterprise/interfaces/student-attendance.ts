export type StudentAttendanceProps = {
  enrollmentId: number
  year: number
  month: number
  isPresent: boolean
  markedByUserId: number
  markedAt: Date
  updatedAt?: Date
}
