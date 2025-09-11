import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const citySchema = pgTable('city', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type CitySchemaInsertProps = typeof citySchema.$inferInsert
export type CitySchemaSelectProps = typeof citySchema.$inferSelect
