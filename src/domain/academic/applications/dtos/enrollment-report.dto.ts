export interface EnrollmentReportDTO {
  regionName: string
  cityName: string
  teachingPlaceName: string
  teachingPlacePropertyLocationCategoryName: string | null
  teachingPlaceTraditionalCommunityName: string | null
  studentName: string
  socialName: string | null
  cpf: string
  rg: string | null
  dateBirth: string | null
  telephone: string | null
  email: string | null
  genderIdentityName: string
  ethnicityName: string
  addressStreet: string | null
  addressNumber: number | null
  addressNeighborhood: string | null
  zipCode: string | null
  addressCity: string | null
  addressPropertyLocationCategoryName: string | null
  addressTraditionalCommunityName: string | null
  highSchoolStatusName: string
  classOptionName: string
  enrollmentDate: string
  enrollmentStatusName: string
}
