import { char, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

export const regionSchema = pgTable('region', {
  id: char('id', { length: 36 })
    .$defaultFn(() => new UniqueEntityID().toValue())
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type RegionSchemaInsertProps = typeof regionSchema.$inferInsert
export type RegionSchemaSelectProps = typeof regionSchema.$inferSelect
