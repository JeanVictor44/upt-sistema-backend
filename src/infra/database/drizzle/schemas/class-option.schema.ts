import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const classOptions = pgEnum('class_options', ['TURMA A', 'TURMA B', 'TURMA C', 'ÚNICA'])

export const classOptionSchema = pgTable('class_option', {
  id: serial('id').primaryKey().notNull(),
  name: classOptions('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassOptionSchemaInsertProps = typeof classOptionSchema.$inferInsert
export type ClassOptionSelectProps = typeof classOptionSchema.$inferSelect
