import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListClassEditionsUseCase } from '@root/domain/academic/applications/use-cases/class-edition/list-class-editions.use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  ListClassEditionsResponseSwaggerDto,
  ListClassEditionsSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class-edition/list-class-editions-swagger.dto'
import { ClassEditionViewModel } from '@root/presentation/view-model/class-edition.view-model'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ListClassEditionsController {
  constructor(private listClassEditions: ListClassEditionsUseCase) {}

  @ApiBearerAuth()
  @Get('/class-editions')
  @HttpCode(200)
  @ListClassEditionsSwaggerDto()
  async handle(@CurrentUser() user: UserPayload): Promise<ListClassEditionsResponseSwaggerDto> {
    const result = await this.listClassEditions.execute({
      userId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(ClassEditionViewModel.toHttp),
    }
  }
}
