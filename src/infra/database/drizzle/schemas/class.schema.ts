import { pgTable, timestamp, varchar, serial, integer } from 'drizzle-orm/pg-core'

import { teachingPlaceSchema } from './teaching-place.schema'

export const classSchema = pgTable('class', {
  id: serial('id').primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull().unique(),
  teachingPlaceId: integer('teaching_place_id')
    .notNull()
    .references(() => teachingPlaceSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassSchemaInsertProps = typeof classSchema.$inferInsert
export type ClassSelectProps = typeof classSchema.$inferSelect
