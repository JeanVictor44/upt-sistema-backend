import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

import { classSchema } from './class.schema'
import { editionSchema } from './edition.schema'

export const classEditionSchema = pgTable('class_edition', {
  id: serial('id').primaryKey(),
  edition_id: serial('edition_id')
    .notNull()
    .references(() => editionSchema.id),
  classId: serial('class_id')
    .notNull()
    .references(() => classSchema.id),
  enrolledCount: integer('enrolled_count').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassEditionSchemaSchemaInsertProps = typeof classEditionSchema.$inferInsert
export type ClassEditionSchemaSelectProps = typeof classEditionSchema.$inferSelect
