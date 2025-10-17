import { boolean, date, pgTable, serial } from 'drizzle-orm/pg-core'

import { classEditionSchema } from './class-edition.schema'
import { enrollmentStatusSchema } from './enrollment-status.schema'
import { studentSchema } from './student.schema'

export const enrollmentSchema = pgTable('enrollment', {
  id: serial('id').primaryKey().notNull(),
  studentId: serial('student_id')
    .notNull()
    .references(() => studentSchema.id),
  enrollmentDate: date('enrollment_date').notNull(),
  statusId: serial('status_id')
    .notNull()
    .references(() => enrollmentStatusSchema.id),
  classEditionId: serial('class_edition_id')
    .notNull()
    .references(() => classEditionSchema.id),
  isExempt: boolean('is_exempt').notNull().default(false),
})

export type EnrollmentSchemaSchemaInsertProps = typeof enrollmentSchema.$inferInsert
export type EnrollmentSchemaSelectProps = typeof enrollmentSchema.$inferSelect
