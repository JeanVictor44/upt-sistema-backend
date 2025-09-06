import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from '@root/infra/env/env'
import { EnvModule } from '@root/infra/env/env.module'
import { AuthModule } from '@root/presentation/auth/auth.module'
import { PresentationsModule } from '@root/presentation/presentation.module'

@Module({
  imports: [
    AuthModule,
    PresentationsModule,
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
