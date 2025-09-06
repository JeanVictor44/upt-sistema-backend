import { char, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

export const citySchema = pgTable('city', {
  id: char('id', { length: 36 })
    .$defaultFn(() => new UniqueEntityID().toValue())
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type CitySchemaInsertProps = typeof citySchema.$inferInsert
export type CitySchemaSelectProps = typeof citySchema.$inferSelect
