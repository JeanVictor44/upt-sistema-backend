import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const shifts = pgEnum('shifts', ['MATUTINO', 'VESPERTINO', 'NOTURNO'])

export const shiftSchema = pgTable('shift', {
  id: serial('id').primaryKey().notNull(),
  name: shifts('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ShiftSchemaSchemaInsertProps = typeof shiftSchema.$inferInsert
export type ShiftSchemaSelectProps = typeof shiftSchema.$inferSelect
