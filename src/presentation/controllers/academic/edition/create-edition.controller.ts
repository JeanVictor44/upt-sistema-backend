import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateEditionUseCase } from '@root/domain/academic/applications/use-cases/edition/create-edition.use-case'
import {
  CreateEditionBodySwaggerDto,
  CreateEditionResponseSwaggerDto,
  CreateEditionSwaggerDto,
} from '@root/presentation/swagger/academic/docs/edition/create-edition-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class CreateEditionController {
  constructor(private createEdition: CreateEditionUseCase) {}

  @ApiBearerAuth()
  @Post('/editions')
  @HttpCode(201)
  @CreateEditionSwaggerDto()
  async handle(@Body() body: CreateEditionBodySwaggerDto): Promise<CreateEditionResponseSwaggerDto> {
    const { year } = body

    const result = await this.createEdition.execute({ year })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Edition created successfully',
    }
  }
}
