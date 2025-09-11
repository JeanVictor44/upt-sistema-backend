import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { neighborhoodSchema } from './neighborhood.schema'

export const teachingPlaceSchema = pgTable('teaching_place', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  neighborhoodId: serial('neighborhood_id')
    .notNull()
    .references(() => neighborhoodSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const teachingPlaceRelations = relations(teachingPlaceSchema, ({ one }) => ({
  neighborhood: one(neighborhoodSchema, {
    fields: [teachingPlaceSchema.neighborhoodId],
    references: [neighborhoodSchema.id],
  }),
}))

export type TeachingPlaceSchemaInsertProps = typeof teachingPlaceSchema.$inferInsert
export type TeachingPlaceSchemaSelectProps = typeof teachingPlaceSchema.$inferSelect
