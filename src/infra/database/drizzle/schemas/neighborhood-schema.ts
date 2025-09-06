import { relations } from 'drizzle-orm'
import { char, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { citySchema } from './city-schema'
import { regionSchema } from './region-schema'

export const neighborhoodSchema = pgTable('neighborhood', {
  id: char('id', { length: 36 })
    .$defaultFn(() => new UniqueEntityID().toValue())
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  city_id: char('city_id', { length: 36 })
    .references(() => citySchema.id)
    .notNull(),
  region_id: char('region_id', { length: 36 })
    .notNull()
    .references(() => regionSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const neighborhoodRelations = relations(neighborhoodSchema, ({ one }) => ({
  city: one(citySchema, {
    fields: [neighborhoodSchema.city_id],
    references: [citySchema.id],
  }),
}))

export type NeighborhoodSchemaInsertProps = typeof neighborhoodSchema.$inferInsert
export type NeighborhoodSchemaSelectProps = typeof neighborhoodSchema.$inferSelect
