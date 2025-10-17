import { ethnicity, ethnicitySchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

const values = ethnicity.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function ethnicitiesStatusSeed(db: DrizzleDB) {
  await db
    .insert(ethnicitySchema)
    .values(values)

    .onConflictDoNothing()
}
