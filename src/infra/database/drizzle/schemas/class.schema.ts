import { pgTable, timestamp, varchar, serial } from 'drizzle-orm/pg-core'

import { classOptionSchema } from './class-option.schema'
import { classStatusSchema } from './class-status.schema'
import { shiftSchema } from './shift.schema'
import { teachingPlaceSchema } from './teaching-place.schema'

export const classSchema = pgTable('class', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
  teachingPlaceId: serial('teaching_place_id')
    .notNull()
    .references(() => teachingPlaceSchema.id),
  shiftId: serial('shift_id')
    .notNull()
    .references(() => shiftSchema.id),
  optionId: serial('option_id')
    .notNull()
    .references(() => classOptionSchema.id),
  statusId: serial('status_id')
    .notNull()
    .references(() => classStatusSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassSchemaInsertProps = typeof classSchema.$inferInsert
export type ClassSelectProps = typeof classSchema.$inferSelect
