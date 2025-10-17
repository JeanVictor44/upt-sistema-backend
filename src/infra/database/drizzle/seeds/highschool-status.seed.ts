import { highschoolStatuses, highSchoolStatusSchema } from '../schemas/highschool-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = highschoolStatuses.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function highschoolStatusSeed(db: DrizzleDB) {
  await db
    .insert(highSchoolStatusSchema)
    .values(values)

    .onConflictDoNothing()
}
