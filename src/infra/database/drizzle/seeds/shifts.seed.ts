import { shifts, shiftSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

const values = shifts.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function shiftSeed(db: DrizzleDB) {
  await db.insert(shiftSchema).values(values).onConflictDoNothing()
}
