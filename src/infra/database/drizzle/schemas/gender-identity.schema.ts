import { pgEnum, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const genderIdentity = pgEnum('gender_identity', [
  'FEMININO - CISGÊNERO',
  'MASCULINO - CISGÊNERO',
  'TRANSGÊNERO',
  'NÃO BINÁRIO',
  'MULHER TRANS',
  'HOMEM TRANS',
])

export const genderIdentitySchema = pgTable('gender_identity', {
  id: serial('id').primaryKey(),
  name: genderIdentity('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type GenderIdentitySchemaInsertProps = typeof genderIdentitySchema.$inferInsert
export type GenderIdentitySelectProps = typeof genderIdentitySchema.$inferSelect
