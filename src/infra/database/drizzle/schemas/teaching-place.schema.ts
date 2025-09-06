import { relations } from 'drizzle-orm'
import { char, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { neighborhoodSchema } from './neighborhood.schema'

export const teachingPlaceSchema = pgTable('teaching_place', {
  id: char('id', { length: 36 })
    .$defaultFn(() => new UniqueEntityID().toValue())
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  neighborhood_id: char('neighborhood_id', { length: 36 })
    .notNull()
    .references(() => neighborhoodSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const teachingPlaceRelations = relations(teachingPlaceSchema, ({ one }) => ({
  neighborhood: one(neighborhoodSchema, {
    fields: [teachingPlaceSchema.neighborhood_id],
    references: [neighborhoodSchema.id],
  }),
}))

export type TeachingPlaceSchemaInsertProps = typeof teachingPlaceSchema.$inferInsert
export type TeachingPlaceSchemaSelectProps = typeof teachingPlaceSchema.$inferSelect
