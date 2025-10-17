import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { CryptographyModule } from '@infra/cryptography/cryptography.module'
import { EnvModule } from '@infra/env/env.module'

import { AuthorizationService } from '../services/authorization-service'
import { AuthenticationUseCase } from './authentication.use-case'
import { CreateUserRoleUseCase } from './create-user-role.use-case'
import { CreateUserUseCase } from './create-user-use-case'
@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  providers: [AuthenticationUseCase, AuthorizationService, CreateUserRoleUseCase, CreateUserUseCase],
  exports: [AuthenticationUseCase, CreateUserRoleUseCase, CreateUserUseCase],
})
export class AuthenticationUseCasesModule {}
