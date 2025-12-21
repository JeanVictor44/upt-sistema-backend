import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

import { classOptionSchema } from './class-option.schema'
import { classStatusSchema } from './class-status.schema'
import { editionSchema } from './edition.schema'
import { shiftSchema } from './shift.schema'
import { teachingPlaceSchema } from './teaching-place.schema'

export const classEditionSchema = pgTable('class_edition', {
  id: serial('id').primaryKey().notNull(),
  editionId: integer('edition_id')
    .notNull()
    .references(() => editionSchema.id),
  shiftId: integer('shift_id')
    .default(1)
    .notNull()
    .references(() => shiftSchema.id),
  optionId: integer('option_id')
    .default(1)
    .notNull()
    .references(() => classOptionSchema.id),
  statusId: integer('status_id')
    .default(1)
    .notNull()
    .references(() => classStatusSchema.id),
  teachingPlaceId: integer('teaching_place_id')
    .notNull()
    .references(() => teachingPlaceSchema.id),
  enrolledCount: integer('enrolled_count').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassEditionSchemaSchemaInsertProps = typeof classEditionSchema.$inferInsert
export type ClassEditionSchemaSelectProps = typeof classEditionSchema.$inferSelect
