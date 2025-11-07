import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListUsersUseCase } from '@root/domain/authentication/applications/use-cases/list-users.use-case'
import {
  ListUserResponseSwaggerDto,
  ListUserSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/list-user-swagger.dto'
import { UserViewModel } from '@root/presentation/view-model/user.view-model'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class ListeUsersController {
  constructor(private listUsers: ListUsersUseCase) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  @ListUserSwaggerDto()
  async handle(): Promise<ListUserResponseSwaggerDto> {
    const result = await this.listUsers.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(UserViewModel.toHttpWithDetails),
    }
  }
}
