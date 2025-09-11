import { classStatuses, classStatusSchema } from '../schemas/class-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = classStatuses.enumValues.map((name, id) => ({ id, name }))

export async function classStatusSeed(db: DrizzleDB) {
  await db
    .insert(classStatusSchema)
    .values(values)
    .onConflictDoUpdate({ target: classStatusSchema.id, set: { name: classStatusSchema.name } })
}
