import { Resource } from '@root/core/domain/resource'
import { Region } from '@root/domain/location/enterprise/entities/region.entity'

interface ResourceProps {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

interface ResourcePropsInsert {
  name: string
  id?: number | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}

export class ResourceMappers {
  static toDomain<EnumType>(data: ResourceProps): Resource<EnumType> {
    return Resource.create({
      id: data.id,
      name: data.name as unknown as EnumType,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  static toPersistence(data: Region): ResourcePropsInsert {
    return {
      id: data.id,
      name: data.name,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
