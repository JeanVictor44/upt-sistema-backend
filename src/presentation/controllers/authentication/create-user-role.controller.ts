import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'
import { CreateUserRoleUseCase } from '@root/domain/authentication/applications/use-cases/create-user-role.use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  CreateUserRoleBodySwaggerDto,
  CreateUserRoleResponseSwaggerDto,
  CreateUserRoleSwaggerDto,
} from '@root/presentation/swagger/authentication/docs/create-user-role-swagger.dto'

@ApiTags('Authentication')
@Controller({ path: '/users', version: '1' })
export class CreateUserRoleController {
  constructor(private createUserRole: CreateUserRoleUseCase) {}

  @ApiBearerAuth()
  @Post('/:userId/roles')
  @HttpCode(201)
  @CreateUserRoleSwaggerDto()
  async handle(
    @Body() body: CreateUserRoleBodySwaggerDto,
    @Param('userId') userId: number,
    @CurrentUser() user: UserPayload,
  ): Promise<CreateUserRoleResponseSwaggerDto> {
    const { roleId, classEditionId, regionId } = body
    const { sub } = user
    const userIdToAssignedRole = Number(userId)

    const result = await this.createUserRole.execute({
      userActionId: sub,
      userId: userIdToAssignedRole,
      roleId: roleId,
      classEditionId: classEditionId,
      regionId: regionId,
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
