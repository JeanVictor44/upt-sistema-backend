import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const studentStatuses = pgEnum('student_statuses', ['MATRICULADO', 'EVADIDO', 'APROVADO'])

export const studentStatusSchema = pgTable('student_status', {
  id: serial('id').primaryKey(),
  name: studentStatuses('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type StudentStatusSchemaInsertProps = typeof studentStatusSchema.$inferInsert
export type StudentStatusSelectProps = typeof studentStatusSchema.$inferSelect
