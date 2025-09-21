import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListEditionsUseCase } from '@root/domain/edition/applications/use-cases/list-editions.use-case'
import {
  ListEditionsResponseSwaggerDto,
  ListEditionsSwaggerDto,
} from '@root/presentation/swagger/edition/docs/list-editions-swagger.dto'
import { EditionViewModel } from '@root/presentation/view-model/edition.view-model'

@ApiTags('Edition')
@Controller({ path: '/editions', version: '1' })
export class ListEditionsController {
  constructor(private listEditions: ListEditionsUseCase) {}

  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  @ListEditionsSwaggerDto()
  async handle(): Promise<ListEditionsResponseSwaggerDto> {
    const result = await this.listEditions.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(EditionViewModel.toHttp),
    }
  }
}
