import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const editionSchema = pgTable('edition', {
  id: serial('id').primaryKey(),
  year: integer('year').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type EditionSchemaInsertProps = typeof editionSchema.$inferInsert
export type EditionSelectProps = typeof editionSchema.$inferSelect
