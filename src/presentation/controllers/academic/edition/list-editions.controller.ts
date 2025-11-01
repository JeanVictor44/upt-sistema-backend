import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListEditionsUseCase } from '@root/domain/academic/applications/use-cases/edition/list-editions.use-case'
import {
  ListEditionsResponseSwaggerDto,
  ListEditionsSwaggerDto,
} from '@root/presentation/swagger/academic/docs/edition/list-editions-swagger.dto'
import { EditionViewModel } from '@root/presentation/view-model/edition.view-model'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ListEditionsController {
  constructor(private listEditions: ListEditionsUseCase) {}

  @ApiBearerAuth()
  @Get('/editions')
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
