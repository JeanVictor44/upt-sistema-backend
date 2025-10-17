import { genderIdentities, genderIdentitySchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

const values = genderIdentities.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function genderIdentitiesSeed(db: DrizzleDB) {
  await db
    .insert(genderIdentitySchema)
    .values(values)

    .onConflictDoNothing()
}
