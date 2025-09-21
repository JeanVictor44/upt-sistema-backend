import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const shift = pgEnum('shift', ['MATUTINO', 'VESPERTINO', 'NOTURNO'])

export const shiftSchema = pgTable('shift', {
  id: serial('id').primaryKey(),
  name: shift('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ShiftSchemaSchemaInsertProps = typeof shiftSchema.$inferInsert
export type ShiftSchemaSelectProps = typeof shiftSchema.$inferSelect
