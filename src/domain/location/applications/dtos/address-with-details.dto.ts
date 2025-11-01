import { PropertyLocationCategory } from '@root/domain/resource/enterprise/interfaces/property-location-category'

export interface AddressWithDetailsDTO {
  id: number
  street?: string | null
  number?: number | null
  neighborhood?: string | null
  city?: string | null
  zipCode?: string | null
  propertyLocationCategory?: {
    id: number
    name: PropertyLocationCategory
    createdAt: Date
    updatedAt: Date
  }
  traditionalCommunityName?: string | null
}
