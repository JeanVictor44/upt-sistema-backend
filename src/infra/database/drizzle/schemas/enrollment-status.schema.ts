import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const enrollmentStatuses = pgEnum('enrollment_status', ['MATRICULADO', 'EVADIDO', 'APROVADO'])

export const enrollmentStatusSchema = pgTable('enrollment_status', {
  id: serial('id').primaryKey(),
  name: enrollmentStatuses('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type EnrollmentStatusSchemaStatusSchemaInsertProps = typeof enrollmentStatusSchema.$inferInsert
export type EnrollmentStatusSchemaStatusSelectProps = typeof enrollmentStatusSchema.$inferSelect
