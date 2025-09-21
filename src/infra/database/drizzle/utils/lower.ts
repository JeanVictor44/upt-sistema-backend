import { sql, SQL } from 'drizzle-orm'
import { AnyPgColumn } from 'drizzle-orm/pg-core'

export function lower(value: AnyPgColumn): SQL {
  return sql`lower(${value})`
}
