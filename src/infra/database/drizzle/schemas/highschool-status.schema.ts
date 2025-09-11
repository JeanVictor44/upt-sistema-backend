import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const highschoolStatuses = pgEnum('highschool_statuses', ['CONCLUÍDO', 'EM CURSO'])

export const highSchoolStatusSchema = pgTable('highschool_status', {
  id: serial('id').primaryKey(),
  name: highschoolStatuses('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type HighSchoolStatusSchemaInsertProps = typeof highSchoolStatusSchema.$inferInsert
export type HighSchoolStatusSelectProps = typeof highSchoolStatusSchema.$inferSelect
