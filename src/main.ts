import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '@root/app.module'
import { EnvService } from '@root/infra/env/env.service'
import { UserDto } from '@root/presentation/swagger/authentication/entities/user.dto'
import { apiReference } from '@scalar/nestjs-api-reference'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.enableCors()
  app.use(cookieParser())

  const isProduction = app.get(EnvService).get('NODE_ENV') === 'production'

  if (!isProduction) {
    const config = new DocumentBuilder().addBearerAuth().build()
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [UserDto],
    })
    SwaggerModule.setup('/', app, document, {
      explorer: true,
      swaggerOptions: {
        urls: [
          {
            name: '1. API',
            url: '/api-json',
          },
        ],
      },
      jsonDocumentUrl: '/api-json',
    })

    app.use(
      '/reference',
      apiReference({
        content: document,
        title: 'UPT Sistema API Reference',
        url: '/api.json',
      }),
    )
  }

  const configService = app.get(EnvService)
  const PORT = configService.get('APP_PORT')
  const SERVICE = configService.get('APP_NAME')
  const VERSION = configService.get('APP_VERSION')

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  app.listen(PORT, () => {
    console.log(`${SERVICE} - ${VERSION} - Listening on port ${PORT}`)
  })
}
bootstrap()
