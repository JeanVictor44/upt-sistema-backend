import { propertyLocationCategory, propertyLocationCategorySchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

const values = propertyLocationCategory.enumValues.map((name, id) => ({ id: id + 1, name }))

export async function propertyLocationCategorySeed(db: DrizzleDB) {
  await db.insert(propertyLocationCategorySchema).values(values).onConflictDoNothing()
}
