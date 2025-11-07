import { Injectable } from '@nestjs/common'

import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'
import { Either, right } from '@core/logic/Either'

import { User } from '../../enterprise/entities/user.entity'
import { UsersRepository } from '../repositories/users.repository'

type OutputProps = Either<ResourceNotFoundError, User[]>

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<OutputProps> {
    const users = await this.usersRepository.findAll()

    return right(users)
  }
}
