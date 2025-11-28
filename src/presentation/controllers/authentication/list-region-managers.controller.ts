import { BadRequestException, Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListRegionManagersUseCase } from '@root/domain/authentication/applications/use-cases/list-region-managers.use-case'
import {
  ListRegionManagersSwaggerDto,
  ListUserRoleManagerResponseSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/list-region-managers-swagger.dto'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class ListeRegionManagersController {
  constructor(private listRegionManager: ListRegionManagersUseCase) {}

  @ApiBearerAuth()
  @Get('/region/:regionId/managers')
  @HttpCode(200)
  @ListRegionManagersSwaggerDto()
  async handle(@Param('regionId') regionId: number): Promise<ListUserRoleManagerResponseSwaggerDto> {
    const result = await this.listRegionManager.execute({
      regionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value,
    }
  }
}
