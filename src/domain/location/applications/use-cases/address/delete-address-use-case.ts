import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { AddressRepository } from '../../repositories/address.repository'

type InputProps = {
  id: number
}

type OutputProps = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteAddressUseCase {
  constructor(private readonly adressRepository: AddressRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { id } = data

    const address = await this.adressRepository.findById(id)
    if (!address) return left(new ResourceNotFoundError())

    await this.adressRepository.delete(address.id)

    return right(null)
  }
}
