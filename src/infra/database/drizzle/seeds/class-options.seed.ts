import { classOptions, classOptionSchema } from '../schemas/class-option.schema'
import { DrizzleDB } from '../types/drizzle'

const values = classOptions.enumValues.map((name, id) => ({ id, name }))

export async function classOptionsSeed(db: DrizzleDB) {
  await db
    .insert(classOptionSchema)
    .values(values)
    .onConflictDoUpdate({ target: classOptionSchema.id, set: { name: classOptionSchema.name } })
}
