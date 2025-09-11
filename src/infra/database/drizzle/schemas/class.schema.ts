import { pgTable, timestamp, varchar, integer, unique, serial } from 'drizzle-orm/pg-core'

import { classOptionSchema } from './class-option.schema'
import { classStatusSchema } from './class-status.schema'
import { teachingPlaceSchema } from './teaching-place.schema'

export const classSchema = pgTable(
  'class',
  {
    id: serial('id').primaryKey(),
    name: varchar({ length: 100 }).notNull().unique(),
    teachingPlaceId: serial('teaching_place_id')
      .notNull()
      .references(() => teachingPlaceSchema.id),
    edition: integer('edition').notNull(),
    optionId: serial('option_id')
      .notNull()
      .references(() => classOptionSchema.id),
    statusId: serial('status_id')
      .notNull()
      .references(() => classStatusSchema.id),
    numberVacancies: integer('number_vacancies').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [unique('unique_class_per_edition').on(table.edition, table.optionId, table.teachingPlaceId)],
)

export type ClassSchemaInsertProps = typeof classSchema.$inferInsert
export type ClassSelectProps = typeof classSchema.$inferSelect
