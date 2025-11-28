import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindBigNumbersUseCase } from '@root/domain/analytics/applications/use-cases/find-big-numbers.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindBigNumbersQueryDto,
  FindBigNumbersResponseSwaggerDto,
  FindBigNumbersSwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-big-numbers-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindBigNumbersController {
  constructor(private findBigNumbers: FindBigNumbersUseCase) {}

  @Public()
  @Get('/big-numbers')
  @HttpCode(200)
  @FindBigNumbersSwaggerDto()
  async handle(@Query() query: FindBigNumbersQueryDto): Promise<FindBigNumbersResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findBigNumbers.execute({ editionId: editionId ? Number(editionId) : undefined })

    if (result.isLeft()) {
      throw new NotFoundException()
    }

    return {
      result: result.value,
    }
  }
}
