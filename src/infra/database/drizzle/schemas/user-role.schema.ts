import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

import { regionSchema } from './region.schema'
import { roleSchema } from './role.schema'
import { teachingPlaceSchema } from './teaching-place.schema'
import { userSchema } from './user.schema'

export const userRoleSchema = pgTable('user_role', {
  id: serial('id').primaryKey().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => userSchema.id),
  roleId: integer('role_id')
    .notNull()
    .references(() => roleSchema.id),
  regionId: integer('region_id').references(() => regionSchema.id),
  teachingPlaceId: integer('teaching_place_id').references(() => teachingPlaceSchema.id),
  startDate: timestamp('start_date').notNull().defaultNow(),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date()),
})

export type UserRoleSchemaInsertProps = typeof userRoleSchema.$inferInsert
export type UserRoleSchemaSelectProps = typeof userRoleSchema.$inferSelect
