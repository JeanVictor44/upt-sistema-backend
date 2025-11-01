import { AsyncMaybe } from '@root/core/logic/Maybe'

import { Address } from '@domain/location/enterprise/entities/address.entity'

export abstract class AddressRepository {
  abstract create(adress: Address): Promise<Address>
  abstract delete(id: number): Promise<void>
  abstract save(region: Address): Promise<void>
  abstract findById(id: number): AsyncMaybe<Address>
}
