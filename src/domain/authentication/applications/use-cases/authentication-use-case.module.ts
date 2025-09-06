import { Module } from '@nestjs/common'
import { DatabaseModule } from '@root/infra/database/database.module'

import { CryptographyModule } from '@infra/cryptography/cryptography.module'
import { EnvModule } from '@infra/env/env.module'

import { AuthenticationUseCase } from './authentication.use-case'
@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  providers: [AuthenticationUseCase],
  exports: [AuthenticationUseCase],
})
export class AuthenticationUseCasesModule {}
