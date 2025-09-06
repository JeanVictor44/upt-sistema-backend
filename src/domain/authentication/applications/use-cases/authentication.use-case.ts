import { Injectable } from '@nestjs/common'
import { UserAuthenticatedSwaggerDto } from '@root/presentation/swagger/authentication/docs/session-swagger.dto'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { Either, left, right } from '@core/logic/Either'

import { Encrypter } from '@domain/authentication/applications/cryptography/encrypter'
import { HashGenerator } from '@domain/authentication/applications/cryptography/hash-generator'
import { WrongCredentialsError } from '@domain/authentication/applications/errors/wrong-credentials.error'
import { UsersRepository } from '@domain/authentication/applications/repositories/users.repository'

type InputProps = {
  document: string
  password: string
}

type OutputProps = Either<
  InactiveResourceError | WrongCredentialsError,
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
  ) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const { document, password } = data

    const user = await this.usersRepository.findByDocument(document)
    if (!user) return left(new WrongCredentialsError())

    const now = new Date().getTime()
    const isDisabledButNotExpired = user.disabledAt !== null && new Date(user.disabledAt).getTime() > now
    if (user.disabledAt && !isDisabledButNotExpired) return left(new InactiveResourceError())

    const passwordMatch = await this.hashGenerator.compare(password, user.password)
    if (!passwordMatch) return left(new WrongCredentialsError())

    const payload = { sub: user.id.toValue(), name: user.name, role: user.role }

    const accessToken = await this.encrypter.encrypt({
      payload,
      expiresIn: '15m',
    })

    return right({ accessToken, user: { id: user.id.toValue(), name: user.name, role: user.role } })
  }
}
