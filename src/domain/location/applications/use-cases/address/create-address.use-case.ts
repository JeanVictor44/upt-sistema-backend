import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { Address } from '@root/domain/location/enterprise/entities/address.entity'

import { Either, right } from '@core/logic/Either'

import { AddressRepository } from '../../repositories/address.repository'

type InputProps = {
  street?: string
  number?: number
  neighborhood?: string
  city?: string
  zipCode?: string
  propertyLocationCategoryId?: number
  traditionalCommunityName?: string
}

type OutputProps = Either<ResourceAlreadyExistsError, Address>

@Injectable()
export class CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const address = Address.create({
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      zipCode: data.zipCode,
      propertyLocationCategoryId: data.propertyLocationCategoryId,
      traditionalCommunityName: data.traditionalCommunityName,
    })

    const addressCreated = await this.addressRepository.create(address)

    return right(addressCreated)
  }
}
