import { z } from 'zod'

export const envSchema = z.object({
  APP_NAME: z.string(),
  APP_VERSION: z.string().default('1.0.0'),
  APP_PORT: z.string().default('3333'),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Auth
  JWT_SECRET_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),

  // Database
  DATABASE_USER: z.string().min(1),
  DATABASE_PASS: z.string().min(1),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().min(1),
  DATABASE_NAME: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
