import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindDistributionByPropertyLocationUseCase } from '@root/domain/analytics/applications/use-cases/find-distribution-by-property-location.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindDistributionByPropertyLocationResponseSwaggerDto,
  FindDistributionByPropertyLocationSwaggerDto,
  FindDistributionByPropertyLocationQueryDto,
} from '@root/presentation/swagger/analytics/docs/find-distribution-by-property-location.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindDistributionByPropertyLocationController {
  constructor(private findDistributionByPropertyLocation: FindDistributionByPropertyLocationUseCase) {}

  @Public()
  @Get('/distribution-by-property-location')
  @HttpCode(200)
  @FindDistributionByPropertyLocationSwaggerDto()
  async handle(
    @Query() query: FindDistributionByPropertyLocationQueryDto,
  ): Promise<FindDistributionByPropertyLocationResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findDistributionByPropertyLocation.execute({
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
