import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'

import * as schema from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { classOptionsSeed } from './class-options.seed'
import { classStatusSeed } from './class-statuses'
import { enrollmentStatusSeed } from './enrollment-status.seed'
import { ethnicitiesStatusSeed } from './ethnicities.seed'
import { genderIdentitiesSeed } from './gender-identities.seed'
import { highschoolStatusSeed } from './highschool-status.seed'
import { propertyLocationCategorySeed } from './property-locations-category.seed'
import { rolesSeed } from './roles.seed'
import { shiftSeed } from './shifts.seed'

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: parseInt(process.env.DATABASE_PORT!),
  ssl: process.env.NODE_ENV === 'production' ? false : { rejectUnauthorized: false },
})
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>

type SeedingFunction = (db: DrizzleDB) => Promise<void>

const seeeds: SeedingFunction[] = [
  classOptionsSeed,
  classStatusSeed,
  highschoolStatusSeed,
  enrollmentStatusSeed,
  rolesSeed,
  ethnicitiesStatusSeed,
  propertyLocationCategorySeed,
  genderIdentitiesSeed,
  shiftSeed,
]
async function main() {
  console.log('🌱 Starting database seeding...')
  await Promise.all(seeeds.map((seed) => seed(db)))
}

main()
  .then(async () => {
    console.log('✅ Database seeding completed successfully!')
    await pool.end()
  })
  .catch(async (error) => {
    console.error('❌ Error seeding database:', error)
    await pool.end()
    process.exit(1)
  })
