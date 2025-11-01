import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { propertyLocationCategorySchema } from './property-location-category.schema'

export const addressSchema = pgTable('adress', {
  id: serial('id').primaryKey().notNull(),
  street: varchar('street', { length: 150 }),
  number: integer('number'),
  neighboorhood: varchar('neighborhood', { length: 100 }),
  city: varchar('city', { length: 100 }),
  zipCode: varchar('zip_code', { length: 8 }),
  propertyLocationCategoryId: integer('property_location_category_id').references(
    () => propertyLocationCategorySchema.id,
  ),
  traditionalCommunityName: varchar('traditional_community_name', { length: 100 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type AddressSchemaSchemaInsertProps = typeof addressSchema.$inferInsert
export type AddressSchemaSchemaSelectProps = typeof addressSchema.$inferSelect
