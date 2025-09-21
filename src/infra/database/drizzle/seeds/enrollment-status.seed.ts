import { enrollmentStatusSchema, enrollmentStatuses } from '../schemas/enrollment-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = enrollmentStatuses.enumValues.map((name, id) => ({ id, name }))

export async function enrollmentStatusSeed(db: DrizzleDB) {
  await db.insert(enrollmentStatusSchema).values(values).onConflictDoNothing()
}
