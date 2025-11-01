import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { neighborhoodSchema } from './neighborhood.schema'
import { propertyLocationCategorySchema } from './property-location-category.schema'

export const teachingPlaceSchema = pgTable('teaching_place', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  neighborhoodId: integer('neighborhood_id')
    .notNull()
    .references(() => neighborhoodSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  propertyLocationCategoryId: integer('property_location_category_id').notNull(),
  traditionalCommunityName: varchar('traditional_community_name', { length: 100 }),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export const teachingPlaceRelations = relations(teachingPlaceSchema, ({ one }) => ({
  neighborhood: one(neighborhoodSchema, {
    fields: [teachingPlaceSchema.neighborhoodId],
    references: [neighborhoodSchema.id],
  }),
  propertyLocationCategory: one(propertyLocationCategorySchema, {
    fields: [teachingPlaceSchema.propertyLocationCategoryId],
    references: [propertyLocationCategorySchema.id],
  }),
}))

export type TeachingPlaceSchemaInsertProps = typeof teachingPlaceSchema.$inferInsert
export type TeachingPlaceSchemaSelectProps = typeof teachingPlaceSchema.$inferSelect
