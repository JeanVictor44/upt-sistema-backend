import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateUserUseCase } from '@root/domain/authentication/applications/use-cases/create-user-use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  CreateUserBodySwaggerDto,
  CreateUserResponseSwaggerDto,
  CreateUserSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/create-user-swagger.dto'
import { UserViewModel } from '@root/presentation/view-model/user.view-model'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'

import { EmailBadFormattedError } from '@domain/authentication/applications/errors/email-bad-formatted-error'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  @CreateUserSwaggerDto()
  async handle(
    @Body() body: CreateUserBodySwaggerDto,
    @CurrentUser() user: UserPayload,
  ): Promise<CreateUserResponseSwaggerDto> {
    const { document, password, email, name, telephone } = body
    const { sub } = user

    const result = await this.createUser.execute({
      userActionId: sub,
      document,
      password,
      email,
      name,
      telephone,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case EmailBadFormattedError:
          throw new BadRequestException(result.value.name, { description: result.value.message })
        case ResourceNotFoundError:
          throw new NotFoundException(result.value, {
            description: result.value.message,
          })
        case InactiveResourceError:
          throw new UnauthorizedException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }
    return {
      result: UserViewModel.toHttp(result.value),
    }
  }
}
