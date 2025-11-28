import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindDistributionByShiftUseCase } from '@root/domain/analytics/applications/use-cases/find-distribution-by-shift.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindDistributionByShiftQueryDto,
  FindDistributionByShiftResponseSwaggerDto,
  FindDistributionByShiftSwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-distribution-by-shift-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindDistributionByShiftController {
  constructor(private findDistributionByShift: FindDistributionByShiftUseCase) {}

  @Public()
  @Get('/distribution-by-shift')
  @HttpCode(200)
  @FindDistributionByShiftSwaggerDto()
  async handle(@Query() query: FindDistributionByShiftQueryDto): Promise<FindDistributionByShiftResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findDistributionByShift.execute({
      editionId: editionId ? Number(editionId) : undefined,
    })

    if (result.isLeft()) {
      throw new NotFoundException()
    }

    return {
      result: result.value,
    }
  }
}
