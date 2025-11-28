import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindDistributionByEthnicityUseCase } from '@root/domain/analytics/applications/use-cases/find-distribution-by-ethnicity.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindDistributionByEthnicityQueryDto,
  FindDistributionByEthnicitySwaggerDto,
  FindDistributionByEthnicityResponseSwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-distribution-by-ethnicity-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindDistributionByEthnicityController {
  constructor(private findDistributionByEthnicity: FindDistributionByEthnicityUseCase) {}

  @Public()
  @Get('/distribution-by-ethnicity')
  @HttpCode(200)
  @FindDistributionByEthnicitySwaggerDto()
  async handle(
    @Query() query: FindDistributionByEthnicityQueryDto,
  ): Promise<FindDistributionByEthnicityResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findDistributionByEthnicity.execute({
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
