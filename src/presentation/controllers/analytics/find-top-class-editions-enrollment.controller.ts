import { Controller, Get, HttpCode, NotFoundException, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FindTopClassEditionsUseCase } from '@root/domain/analytics/applications/use-cases/find-top-class-editions-enrollment.use-case'
import { Public } from '@root/presentation/auth/public'
import {
  FindTopClassEditionEnrollmentQueryDto,
  FindTopClassEditionsEnrollmentResponseSwaggerDto,
  FindTopClassEditionsEnrollmentSwaggerDto,
} from '@root/presentation/swagger/analytics/docs/find-top-class-editions-enrollment-swagger.dto'

@ApiTags('Analytics')
@Controller({ path: '/analytics', version: '1' })
export class FindTopClassEditionsEnrollmentController {
  constructor(private findTopClassEditions: FindTopClassEditionsUseCase) {}

  @Public()
  @Get('/top-class-editions-enrollment')
  @HttpCode(200)
  @FindTopClassEditionsEnrollmentSwaggerDto()
  async handle(
    @Query() query: FindTopClassEditionEnrollmentQueryDto,
  ): Promise<FindTopClassEditionsEnrollmentResponseSwaggerDto> {
    const { editionId } = query

    const result = await this.findTopClassEditions.execute({
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
