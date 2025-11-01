import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListShiftsUseCase } from '@root/domain/resource/applications/use-cases/list-shifts.use-case'
import { Shift } from '@root/domain/resource/enterprise/interfaces/shift'
import {
  ListShiftsResponseSwaggerDto,
  ListShiftsSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-shifts-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListShiftsController {
  constructor(private listShifts: ListShiftsUseCase) {}

  @ApiBearerAuth()
  @Get('/shifts')
  @HttpCode(200)
  @ListShiftsSwaggerDto()
  async handle(): Promise<ListShiftsResponseSwaggerDto> {
    const result = await this.listShifts.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<Shift>(resource)),
    }
  }
}
