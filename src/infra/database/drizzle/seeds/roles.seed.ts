import { roleSchema, roles } from '../schemas/role.schema'
import { DrizzleDB } from '../types/drizzle'

const values = roles.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function rolesSeed(db: DrizzleDB) {
  await db.insert(roleSchema).values(values).onConflictDoNothing()
}
