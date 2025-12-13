import { boolean, integer, pgTable, serial, timestamp, unique } from 'drizzle-orm/pg-core'

import { enrollmentSchema } from './enrollment.schema'
import { userSchema } from './user.schema'

export const studentAttendanceSchema = pgTable(
  'student_attendance',
  {
    id: serial('id').primaryKey().notNull(),
    enrollmentId: integer('enrollment_id')
      .notNull()
      .references(() => enrollmentSchema.id),
    year: integer('year').notNull(),
    month: integer('month').notNull(),
    isPresent: boolean('is_present').notNull(),
    markedBy: integer('marked_by')
      .notNull()
      .references(() => userSchema.id),
    markedAt: timestamp('marked_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [unique('student_monthly_attendance_unique_constraint').on(table.enrollmentId, table.year, table.month)],
)

export type StudentAttendanceschemaInsertProps = typeof studentAttendanceSchema.$inferInsert
export type StudentAttendanceSchemaSelectProps = typeof studentAttendanceSchema.$inferSelect
