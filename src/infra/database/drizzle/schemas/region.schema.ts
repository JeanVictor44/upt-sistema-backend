import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const regionSchema = pgTable('region', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type RegionSchemaInsertProps = typeof regionSchema.$inferInsert
export type RegionSchemaSelectProps = typeof regionSchema.$inferSelect
