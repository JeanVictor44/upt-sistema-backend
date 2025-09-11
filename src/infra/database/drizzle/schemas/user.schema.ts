import { pgEnum, pgTable, text, timestamp, varchar, unique, serial } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', ['ADMIN', 'REGION_MANAGER', 'SECRETARY'])

export const userSchema = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: text('password').notNull(),
    document: varchar('document', { length: 11 }).notNull().unique(),
    telephone: varchar('telephone', { length: 12 }).notNull(),
    disabledAt: timestamp('disabled_at'),
    role: userRole('role').default('SECRETARY').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [unique('unique_email').on(t.email).nullsNotDistinct()],
)

export type UserSchemaInsertProps = typeof userSchema.$inferInsert
export type UserSchemaSelectProps = typeof userSchema.$inferSelect
