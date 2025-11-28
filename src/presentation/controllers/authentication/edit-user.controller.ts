import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { EditUserUseCase } from '@root/domain/authentication/applications/use-cases/edit-user-use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  EditUserBodySwaggerDto,
  EditUserResponseSwaggerDto,
  EditUserSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/edit-user-swagger.dto'
import { UserViewModel } from '@root/presentation/view-model/user.view-model'

import { InactiveResourceError } from '@core/errors/errors/inactive-resource-error'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error'

import { EmailBadFormattedError } from '@domain/authentication/applications/errors/email-bad-formatted-error'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @ApiBearerAuth()
  @Put('/:id')
  @HttpCode(201)
  @EditUserSwaggerDto()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body() body: EditUserBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditUserResponseSwaggerDto> {
    const { document, password, email, name, telephone, disabledAt } = body
    const { sub } = user

    const result = await this.editUser.execute({
      userActionId: sub,
      id,
      document,
      password: password ?? '',
      email,
      name,
      telephone,
      disabledAt,
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
