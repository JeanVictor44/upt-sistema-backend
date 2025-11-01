import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { AddressRepository } from '../../repositories/address.repository'

type InputProps = {
  id: number
  street?: string
  number?: number
  neighborhood?: string
  city?: string
  zipCode?: string
  propertyLocationCategoryId?: number
  traditionalCommunityName?: string
}

type OutputProps = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class EditAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const address = await this.addressRepository.findById(data.id)
    if (!address) return left(new ResourceNotFoundError())

    address.city = data.city ?? address.city
    address.neighborhood = data.neighborhood ?? address.neighborhood
    address.number = data.number ?? address.number
    address.propertyLocationCategoryId = data.propertyLocationCategoryId ?? address.propertyLocationCategoryId
    address.street = data.street ?? address.street
    address.traditionalCommunityName = data.traditionalCommunityName ?? address.traditionalCommunityName
    address.zipCode = data.zipCode ?? address.zipCode

    await this.addressRepository.save(address)

    return right(null)
  }
}
