import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { CreateAddressUseCase } from '@root/domain/location/applications/use-cases/address/create-address.use-case'
import {
  CreateAddressBodySwaggerDto,
  CreateAddressResponseSwaggerDto,
  CreateAddressSwaggerDto,
} from '@root/presentation/swagger/location/docs/address/create-address-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class CreateAddressController {
  constructor(private createAddress: CreateAddressUseCase) {}

  @ApiBearerAuth()
  @Post('/addresses')
  @HttpCode(201)
  @CreateAddressSwaggerDto()
  async handle(@Body() body: CreateAddressBodySwaggerDto): Promise<CreateAddressResponseSwaggerDto> {
    const { city, neighborhood, number, propertyLocationCategoryId, street, traditionalCommunityName, zipCode } = body

    const result = await this.createAddress.execute({
      city,
      neighborhood,
      number,
      propertyLocationCategoryId,
      street,
      traditionalCommunityName,
      zipCode,
    })

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
      result: {
        id: result.value.id,
      },
    }
  }
}
