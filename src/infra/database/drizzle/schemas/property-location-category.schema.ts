import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const propertyLocationCategory = pgEnum('property_location_categories', [
  'ZONA URBANA - CENTRO',
  'ZONA URBANA - PERIFERIA',
  'ZONA RURAL',
  'QUILOMBO',
  'ASSENTAMENTO',
  'ALDEIA INDÍGENA',
  'FUNDO DE PASTO',
  'FECHO DE PASTO',
  'OUTRA',
])

export const propertyLocationCategorySchema = pgTable('property_location_category', {
  id: serial('id').primaryKey().notNull(),
  name: propertyLocationCategory('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type PropertyLocationCategorySchemaSchemaInsertProps = typeof propertyLocationCategorySchema.$inferInsert
export type PropertyLocationCategorySchemaSelectProps = typeof propertyLocationCategorySchema.$inferSelect
