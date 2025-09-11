import { highschoolStatuses, highSchoolStatusSchema } from '../schemas/highschool-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = highschoolStatuses.enumValues.map((name, id) => ({ id, name }))

export async function highschoolStatusSeed(db: DrizzleDB) {
  await db
    .insert(highSchoolStatusSchema)
    .values(values)
    .onConflictDoUpdate({ target: highSchoolStatusSchema.id, set: { name: highSchoolStatusSchema.name } })
}
