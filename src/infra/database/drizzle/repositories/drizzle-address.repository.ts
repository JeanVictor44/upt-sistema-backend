import { Inject, Injectable } from '@nestjs/common'
import { AddressRepository } from '@root/domain/location/applications/repositories/address.repository'
import { Address } from '@root/domain/location/enterprise/entities/address.entity'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { AddressMappers } from '../mappers/address.mappers'
import { addressSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleAddressRepository implements AddressRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(address: Address): Promise<Address> {
    const preparedData = AddressMappers.toPersistence(address)

    const createdAddress = (await this.db.insert(addressSchema).values(preparedData).returning())[0]

    return AddressMappers.toDomain(createdAddress)
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(addressSchema).where(eq(addressSchema.id, id))
  }
  async save(address: Address): Promise<void> {
    const preparedData = AddressMappers.toPersistence(address)

    await this.db.update(addressSchema).set(preparedData).where(eq(addressSchema.id, address.id))
  }

  async findById(id: number): Promise<Address | null> {
    const address = await this.db.query.addressSchema.findFirst({
      where: eq(addressSchema.id, id),
    })

    if (!address) return null

    return AddressMappers.toDomain(address)
  }
}
