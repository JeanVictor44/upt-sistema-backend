import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListClassesUseCase } from '@root/domain/academic/applications/use-cases/class/list-classes.use-case'
import {
  ListClassesResponseSwaggerDto,
  ListClassesSwaggerDto,
} from '@root/presentation/swagger/academic/docs/class/list-classes-swagger.dto'
import { ClassViewModel } from '@root/presentation/view-model/class.view-model'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ListClassesController {
  constructor(private listClasses: ListClassesUseCase) {}

  @ApiBearerAuth()
  @Get('/classes')
  @HttpCode(200)
  @ListClassesSwaggerDto()
  async handle(): Promise<ListClassesResponseSwaggerDto> {
    const result = await this.listClasses.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map(ClassViewModel.toHttp),
    }
  }
}
