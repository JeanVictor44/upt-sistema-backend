import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const classStatuses = pgEnum('class_statuses', ['ATIVA', 'FECHADA'])

export const classStatusSchema = pgTable('class_status', {
  id: serial('id').primaryKey(),
  name: classStatuses('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type ClassStatusSchemaInsertProps = typeof classStatusSchema.$inferInsert
export type ClassStatusSelectProps = typeof classStatusSchema.$inferSelect
