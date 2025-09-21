import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const ethnicity = pgEnum('ethnicity', ['AMARELA', 'BRANCA', 'INDÍGENA', 'PARDA', 'PRETA', 'OUTRA'])

export const ethnicitySchema = pgTable('ethnicity', {
  id: serial('id').primaryKey(),
  name: ethnicity('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type EthnicitySchemaInsertProps = typeof ethnicitySchema.$inferInsert
export type EthnicitySelectProps = typeof ethnicitySchema.$inferSelect
