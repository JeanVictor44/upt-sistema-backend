import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { DATABASE_CONNECTION } from './database-connection'
import * as schema from './schemas'

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (envs: ConfigService) => {
        const pool = new Pool({
          user: envs.get('DATABASE_USER'),
          host: envs.get('DATABASE_HOST'),
          database: envs.get('DATABASE_NAME'),
          password: envs.get('DATABASE_PASS'),
          port: parseInt(envs.get('DATABASE_PORT')!),
          ssl: false,
        })
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DrizzleModule {}
