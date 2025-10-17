import { pgTable, timestamp, varchar, serial, integer } from 'drizzle-orm/pg-core'

import { classOptionSchema } from './class-option.schema'
import { classStatusSchema } from './class-status.schema'
import { shiftSchema } from './shift.schema'
import { teachingPlaceSchema } from './teaching-place.schema'

export const classSchema = pgTable('class', {
  id: serial('id').primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull().unique(),
  teachingPlaceId: integer('teaching_place_id')
    .notNull()
    .references(() => teachingPlaceSchema.id),
  shiftId: integer('shift_id')
    .notNull()
    .references(() => shiftSchema.id),
  optionId: integer('option_id')
    .notNull()
    .references(() => classOptionSchema.id),
  statusId: integer('status_id')
    .notNull()
    .references(() => classStatusSchema.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassSchemaInsertProps = typeof classSchema.$inferInsert
export type ClassSelectProps = typeof classSchema.$inferSelect
