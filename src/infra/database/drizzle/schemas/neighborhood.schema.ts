import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { citySchema } from './city.schema'
import { regionSchema } from './region.schema'

export const neighborhoodSchema = pgTable('neighborhood', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  cityId: serial('city_id')
    .references(() => citySchema.id)
    .notNull(),
  regionId: serial('region_id')
    .notNull()
    .references(() => regionSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const neighborhoodRelations = relations(neighborhoodSchema, ({ one }) => ({
  city: one(citySchema, {
    fields: [neighborhoodSchema.cityId],
    references: [citySchema.id],
  }),
  region: one(regionSchema, {
    fields: [neighborhoodSchema.regionId],
    references: [regionSchema.id],
  }),
}))

export type NeighborhoodSchemaInsertProps = typeof neighborhoodSchema.$inferInsert
export type NeighborhoodSchemaSelectProps = typeof neighborhoodSchema.$inferSelect
