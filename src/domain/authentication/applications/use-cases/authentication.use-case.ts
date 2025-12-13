import { Injectable } from '@nestjs/common'
import { NotAllowedError } from '@root/core/errors/errors/not-allowed-error'
import { ResourceRepository } from '@root/domain/resource/applications/repositories/resource-repository'
import { UserAuthenticatedSwaggerDto } from '@root/presentation/swagger/authentication/docs/session-swagger.dto'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { Either, left, right } from '@core/logic/Either'

import { Encrypter } from '@domain/authentication/applications/cryptography/encrypter'
import { HashGenerator } from '@domain/authentication/applications/cryptography/hash-generator'
import { WrongCredentialsError } from '@domain/authentication/applications/errors/wrong-credentials.error'
import { UsersRepository } from '@domain/authentication/applications/repositories/users.repository'

import { UserRolesRepository } from '../repositories/user-role.repository'

type InputProps = {
  document: string
  password: string
}

type OutputProps = Either<
  InactiveResourceError | WrongCredentialsError | NotAllowedError,
  {
    accessToken: string
    user: UserAuthenticatedSwaggerDto
  }
>

@Injectable()
export class AuthenticationUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator,
    private readonly encrypter: Encrypter,
    private readonly userRolesRepository: UserRolesRepository,
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { document, password } = data

    const user = await this.usersRepository.findByDocument(document)
    if (!user) return left(new WrongCredentialsError())

    if (user.disabledAt) return left(new InactiveResourceError())

    const passwordMatch = await this.hashGenerator.compare(password, user.password)
    if (!passwordMatch) return left(new WrongCredentialsError())

    const userRole = await this.userRolesRepository.findActiveRoleByUserId(user.id)

    if (!userRole) return left(new NotAllowedError())

    const role = await this.resourceRepository.findRoleById(userRole.roleId)
    if (!role) return left(new NotAllowedError())

    const payload = {
      sub: user.id,
      name: user.name,
      role: {
        id: role.id,
        name: role.name,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
      },
    }

    const accessToken = await this.encrypter.encrypt({
      payload,
      expiresIn: 30 * 24 * 60 * 60,
    })

    return right({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        role: {
          id: role.id,
          name: role.name,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        },
      },
    })
  }
}
