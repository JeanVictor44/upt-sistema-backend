import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindEnrollmentEvolutionUseCase } from '@root/domain/analytics/applications/use-cases/find-enrollment-evolution.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindEnrollmentEvolutionQueryDto,
  FindEnrollmentEvolutionResponseSwaggerDto,
  FindEnrollmentEvolutionSwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-enrollment-evolution-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindEnrollmentEvolutionController {
  constructor(private findEnrollmentEvolution: FindEnrollmentEvolutionUseCase) {}

  @Public()
  @Get('/enrollment-evolution')
  @HttpCode(200)
  @FindEnrollmentEvolutionSwaggerDto()
  async handle(@Query() query: FindEnrollmentEvolutionQueryDto): Promise<FindEnrollmentEvolutionResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findEnrollmentEvolution.execute({
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
