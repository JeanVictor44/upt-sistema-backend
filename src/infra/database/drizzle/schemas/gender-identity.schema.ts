import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const genderIdentities = pgEnum('gender_identities', [
  'FEMININO - CISGÊNERO',
  'MASCULINO - CISGÊNERO',
  'TRANSGÊNERO',
  'NÃO BINÁRIO',
  'MULHER TRANS',
  'HOMEM TRANS',
])

export const genderIdentitySchema = pgTable('gender_identity', {
  id: serial('id').primaryKey().notNull(),
  name: genderIdentities('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type GenderIdentitySchemaInsertProps = typeof genderIdentitySchema.$inferInsert
export type GenderIdentitySelectProps = typeof genderIdentitySchema.$inferSelect
