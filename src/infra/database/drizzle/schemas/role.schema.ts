import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const roles = pgEnum('roles', ['ADMIN', 'INTERIOR_MANAGER', 'SECRETARY', 'CAPITAL_MANAGER'])

export const roleSchema = pgTable('role', {
  id: serial('id').primaryKey().notNull(),
  name: roles('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type RoleSchemaInsertProps = typeof roleSchema.$inferInsert
export type RoleSchemaSelectProps = typeof roleSchema.$inferSelect
