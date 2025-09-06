import { char, pgTable, timestamp } from 'drizzle-orm/pg-core'

import { UniqueEntityID } from '@core/domain/unique-entity-id'

import { userSchema } from './user-schema'

export const refreshTokenSchema = pgTable('refresh_token', {
  id: char('id', { length: 36 })
    .$defaultFn(() => new UniqueEntityID().toValue())
    .primaryKey(),
  userId: char('user_id', { length: 36 })
    .notNull()
    .references(() => userSchema.id),
  token: char('token', { length: 64 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expiresAt').notNull(),
})

export type RefreshTokenSchemaInsertProps = typeof refreshTokenSchema.$inferInsert
export type RefreshTokenSchemaSelectProps = typeof refreshTokenSchema.$inferSelect
