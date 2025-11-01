import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { EditAddressUseCase } from '@root/domain/location/applications/use-cases/address/edit-address.use-case'
import {
  EditAddressBodySwaggerDto,
  EditAddressResponseSwaggerDto,
  EditAddressSwaggerDto,
} from '@root/presentation/swagger/location/docs/address/edit-address-swagger.dto'

@ApiTags('Location')
@Controller({ path: '/location', version: '1' })
export class EditAddressController {
  constructor(private editAddress: EditAddressUseCase) {}

  @ApiBearerAuth()
  @Put('/addresses/:id')
  @HttpCode(201)
  @EditAddressSwaggerDto()
  async handle(
    @Body() body: EditAddressBodySwaggerDto,
    @Param('id') id: number,
  ): Promise<EditAddressResponseSwaggerDto> {
    const { city, neighborhood, number, propertyLocationCategoryId, street, traditionalCommunityName, zipCode } = body
    const result = await this.editAddress.execute({
      city,
      neighborhood,
      number,
      propertyLocationCategoryId,
      street,
      traditionalCommunityName,
      zipCode,
      id,
    })

    if (result.isLeft()) {
      const error = result.value
      console.log(error)

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(result.value.name, { description: result.value.message })
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Address edited successfully',
    }
  }
}
