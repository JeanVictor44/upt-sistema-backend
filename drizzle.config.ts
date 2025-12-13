import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './src/infra/database/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.DATABASE_USER!,
    host: process.env.DATABASE_HOST!,
    database: process.env.DATABASE_NAME!,
    password: process.env.DATABASE_PASS!,
    port: parseInt(process.env.DATABASE_PORT!),
    ssl: {
      rejectUnauthorized: false,
    },
  },
})
