import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListRolesUseCase } from '@root/domain/resource/applications/use-cases/list-roles.use-case'
import { Roles } from '@root/domain/resource/enterprise/interfaces/role'
import {
  ListRolesResponseSwaggerDto,
  ListRolesSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-roles.swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListRolesController {
  constructor(private listRoles: ListRolesUseCase) {}

  @ApiBearerAuth()
  @Get('/roles')
  @HttpCode(200)
  @ListRolesSwaggerDto()
  async handle(): Promise<ListRolesResponseSwaggerDto> {
    const result = await this.listRoles.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<Roles>(resource)),
    }
  }
}
