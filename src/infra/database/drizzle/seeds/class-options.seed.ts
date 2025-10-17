import { classOptions, classOptionSchema } from '../schemas/class-option.schema'
import { DrizzleDB } from '../types/drizzle'

const values = classOptions.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function classOptionsSeed(db: DrizzleDB) {
  await db.insert(classOptionSchema).values(values).onConflictDoNothing()
}
