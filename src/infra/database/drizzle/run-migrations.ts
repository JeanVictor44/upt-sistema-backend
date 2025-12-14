// src/infra/database/drizzle/run-migrations.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'
import { Pool } from 'pg'
import 'dotenv/config'

async function run() {
  const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    ssl: process.env.NODE_ENV === 'production' ? false : { rejectUnauthorized: false },
  })

  const db = drizzle(pool)

  try {
    console.log('🚀 Running migrations...')

    const migrationsFolder =
      process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '../../../../drizzle')
        : path.join(__dirname, '../../../../drizzle')

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
