import { studentStatuses, studentStatusSchema } from '../schemas/student-status.schema'
import { DrizzleDB } from '../types/drizzle'

const values = studentStatuses.enumValues.map((name, id) => ({ id, name }))

export async function studentStatusSeed(db: DrizzleDB) {
  await db
    .insert(studentStatusSchema)
    .values(values)
    .onConflictDoUpdate({ target: studentStatusSchema.id, set: { name: studentStatusSchema.name } })
}
