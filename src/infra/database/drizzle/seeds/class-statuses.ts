import { classStatuses, classStatusSchema } from '../schemas/class-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = classStatuses.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function classStatusSeed(db: DrizzleDB) {
  await db.insert(classStatusSchema).values(values).onConflictDoNothing()
}
