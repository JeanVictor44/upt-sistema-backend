import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateEditionUseCase } from '@root/domain/edition/applications/use-cases/create-edition.use-case'
import {
  CreateEditionBodySwaggerDto,
  CreateEditionResponseSwaggerDto,
  CreateEditionSwaggerDto,
} from '@root/presentation/swagger/edition/docs/create-edition-swagger.dto'

@ApiTags('Edition')
@Controller({ path: '/editions', version: '1' })
export class CreateEditionController {
  constructor(private createEdition: CreateEditionUseCase) {}

  @ApiBearerAuth()
  @Post()
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
