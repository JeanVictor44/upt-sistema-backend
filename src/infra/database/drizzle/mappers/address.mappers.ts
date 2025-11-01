import { Address } from '@root/domain/location/enterprise/entities/address.entity'

import { AddressSchemaSchemaInsertProps, AddressSchemaSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class AddressMappers {
  static toDomain(data: AddressSchemaSchemaSelectProps): Address {
    return Address.create(
      {
        street: data.street || undefined,
        number: data.number || undefined,
        neighborhood: data.neighboorhood || undefined,
        city: data.city || undefined,
        zipCode: data.zipCode || undefined,
        propertyLocationCategoryId: data.propertyLocationCategoryId || undefined,
        traditionalCommunityName: data.traditionalCommunityName || undefined,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: Address): AddressSchemaSchemaInsertProps {
    return {
      id: data.id,
      propertyLocationCategoryId: data.propertyLocationCategoryId,
      city: data.city,
      neighboorhood: data.neighborhood,
      number: data.number,
      street: data.street,
      traditionalCommunityName: data.traditionalCommunityName,
      zipCode: data.zipCode,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
