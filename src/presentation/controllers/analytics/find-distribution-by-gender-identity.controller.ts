import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindDistributionByGenderIdentityUseCase } from '@root/domain/analytics/applications/use-cases/find-distribution-by-gender-identity.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindDistributionByGenderIdentityQueryDto,
  FindDistributionByGenderIdentityResponseSwaggerDto,
  FindDistributionByGenderIdentitySwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-distribution-by-gender-identity-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindDistributionByGenderIdentityController {
  constructor(private findDistributionByGenderIdentity: FindDistributionByGenderIdentityUseCase) {}

  @Public()
  @Get('/distribution-by-gender-identity')
  @HttpCode(200)
  @FindDistributionByGenderIdentitySwaggerDto()
  async handle(
    @Query() query: FindDistributionByGenderIdentityQueryDto,
  ): Promise<FindDistributionByGenderIdentityResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findDistributionByGenderIdentity.execute({
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
