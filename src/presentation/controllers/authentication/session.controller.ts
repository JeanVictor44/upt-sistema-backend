import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticationUseCase } from '@root/domain/authentication/applications/use-cases/authentication.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  SessionBodySwaggerDto,
  SessionResponseSwaggerDto,
  SessionSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/session-swagger.dto'
import { mapDomainErrors } from '@root/shared/utils/mapDomainErrors'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'

import { EmailBadFormattedError } from '@domain/authentication/applications/errors/email-bad-formatted-error'
import { WrongCredentialsError } from '@domain/authentication/applications/errors/wrong-credentials.error'

const errorMap = mapDomainErrors([
  [[EmailBadFormattedError], BadRequestException],
  [[ResourceNotFoundError], NotFoundException],
  [[InactiveResourceError, WrongCredentialsError], UnauthorizedException],
])

@ApiTags('Authentication')
@Controller({ path: '/auth', version: '1' })
export class SessionController {
  constructor(private authentication: AuthenticationUseCase) {}

  @Public()
  @Post('/session')
  @HttpCode(200)
  @SessionSwaggerDto()
  async handle(@Body() body: SessionBodySwaggerDto): Promise<SessionResponseSwaggerDto> {
    const { document, password } = body

    const result = await this.authentication.execute({ document, password })

    if (result.isLeft()) {
      const error = result.value
      const handler = errorMap.get(error.constructor as new (...args: any[]) => Error)
      if (handler) throw handler(error)
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }
    return result.value
  }
}
