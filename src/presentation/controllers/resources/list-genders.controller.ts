import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ListGenderIdentitiesUseCase } from '@root/domain/resource/applications/use-cases/list-gender.use-case'
import { GenderIdentities } from '@root/domain/resource/enterprise/interfaces/gender-identity'
import {
  ListGenderResponseSwaggerDto,
  ListGendersSwaggerDto,
} from '@root/presentation/swagger/resources/docs/list-gender-swagger.dto'
import { ResourceViewModel } from '@root/presentation/view-model/resource-view-model'

@ApiTags('Resources')
@Controller({ path: '/resources', version: '1' })
export class ListGendersController {
  constructor(private listGenders: ListGenderIdentitiesUseCase) {}

  @ApiBearerAuth()
  @Get('/genders')
  @HttpCode(200)
  @ListGendersSwaggerDto()
  async handle(): Promise<ListGenderResponseSwaggerDto> {
    const result = await this.listGenders.execute()

    if (result.isLeft()) {
      throw new BadRequestException('Bad request', { description: 'BadRequestError' })
    }

    return {
      results: result.value.map((resource) => ResourceViewModel.toHttp<GenderIdentities>(resource)),
    }
  }
}
