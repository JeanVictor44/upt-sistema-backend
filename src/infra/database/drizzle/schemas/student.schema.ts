import { date, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { classSchema } from './class.schema'
import { highSchoolStatusSchema } from './highschool-status.schema'

export const studentSchema = pgTable('student', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  socialName: varchar('social_name', { length: 100 }),
  cpf: varchar('cpf', { length: 11 }).unique(),
  rg: varchar('rg', { length: 10 }).unique(),
  date_birth: date('date_birth'),
  telephone: varchar('telephone', { length: 15 }),
  email: varchar('email', { length: 100 }).unique(),
  classId: serial('class_id')
    .notNull()
    .references(() => classSchema.id),
  highSchoolStatusId: serial('high_school_status')
    .notNull()
    .references(() => highSchoolStatusSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type StudentSchemaInsertProps = typeof studentSchema.$inferInsert
export type StudentSchemaSelectProps = typeof studentSchema.$inferSelect
