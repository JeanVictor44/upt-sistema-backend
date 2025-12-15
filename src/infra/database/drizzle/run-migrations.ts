// src/infra/database/drizzle/run-migrations.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import * as path from 'path'
import { Pool } from 'pg'
import 'dotenv/config'

async function run() {
  const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    ssl: false, // 🔥 correto para Postgres local / docker
  })

  const db = drizzle(pool)

  try {
    console.log('🚀 Running migrations...')

    // Em produção: /app/drizzle (copiado no Dockerfile)
    // Em dev: __dirname/../../../../../drizzle
    const migrationsFolder =
      process.env.NODE_ENV === 'production'
        ? path.join(process.cwd(), 'drizzle')
        : path.join(__dirname, '../../../../drizzle')

    console.log('📂 Migrations folder:', migrationsFolder)
    console.log('📂 Working directory:', process.cwd())
    console.log('📂 __dirname:', __dirname)

    await migrate(db, { migrationsFolder })

    console.log('✅ Migrations completed successfully')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

run()
