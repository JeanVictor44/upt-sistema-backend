import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { EditUserRoleUseCase } from '@root/domain/authentication/applications/use-cases/edit-user-role.use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  EditUserRoleBodySwaggerDto,
  EditUserRoleResponseSwaggerDto,
  EditUserRoleSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/edit-user-role-swagger.dto'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class EditUserRoleController {
  constructor(private editUserRole: EditUserRoleUseCase) {}

  @ApiBearerAuth()
  @Put('/:userId/roles')
  @HttpCode(201)
  @EditUserRoleSwaggerDto()
  async handle(
    @Body() body: EditUserRoleBodySwaggerDto,
    @Param('userId') userId: number,
    @CurrentUser() user: UserPayload,
  ): Promise<EditUserRoleResponseSwaggerDto> {
    const { roleId, teachingPlaceId, regionId } = body
    const { sub } = user
    const userIdToAssignedRole = Number(userId)

    const result = await this.editUserRole.execute({
      userActionId: sub,
      userId: userIdToAssignedRole,
      roleId,
      teachingPlaceId,
      regionId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value, {
            description: result.value.message,
          })

        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }
    return {
      description: 'Role succesfully assigned',
    }
  }
}
