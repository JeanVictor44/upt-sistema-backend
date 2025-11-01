import { boolean, date, integer, pgTable, serial } from 'drizzle-orm/pg-core'

import { classEditionSchema } from './class-edition.schema'
import { enrollmentStatusSchema } from './enrollment-status.schema'
import { studentSchema } from './student.schema'

export const enrollmentSchema = pgTable('enrollment', {
  id: serial('id').primaryKey().notNull(),
  studentId: integer('student_id')
    .notNull()
    .references(() => studentSchema.id),
  enrollmentDate: date('enrollment_date').notNull(),
  statusId: integer('status_id')
    .notNull()
    .references(() => enrollmentStatusSchema.id),
  classEditionId: integer('class_edition_id')
    .notNull()
    .references(() => classEditionSchema.id),
  isExempt: boolean('is_exempt').notNull().default(false),
})

export type EnrollmentSchemaSchemaInsertProps = typeof enrollmentSchema.$inferInsert
export type EnrollmentSchemaSelectProps = typeof enrollmentSchema.$inferSelect
