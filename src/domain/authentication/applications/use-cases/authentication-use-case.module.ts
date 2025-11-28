import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { CryptographyModule } from '@infra/cryptography/cryptography.module'
import { EnvModule } from '@infra/env/env.module'

import { AuthorizationService } from '../services/authorization-service'
import { AuthenticationUseCase } from './authentication.use-case'
import { CreateUserRoleUseCase } from './create-user-role.use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { EditUserRoleUseCase } from './edit-user-role.use-case'
import { EditUserUseCase } from './edit-user-use-case'
import { ListRegionManagersUseCase } from './list-region-managers.use-case'
import { ListUsersUseCase } from './list-users.use-case'
@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  providers: [
    AuthenticationUseCase,
    AuthorizationService,
    CreateUserRoleUseCase,
    CreateUserUseCase,
    ListUsersUseCase,
    EditUserUseCase,
    EditUserRoleUseCase,
    ListRegionManagersUseCase,
  ],
  exports: [
    AuthenticationUseCase,
    CreateUserRoleUseCase,
    CreateUserUseCase,
    ListUsersUseCase,
    EditUserUseCase,
    EditUserRoleUseCase,
    ListRegionManagersUseCase,
  ],
})
export class AuthenticationUseCasesModule {}
