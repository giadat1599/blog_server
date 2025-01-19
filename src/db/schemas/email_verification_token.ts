import { InferSelectModel } from 'drizzle-orm'
import { serial, pgTable, timestamp, text } from 'drizzle-orm/pg-core'

export const emailVerificationTokenTable = pgTable('email_verification_token', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  code: text('code').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
})

export type EmailVerificationToken = InferSelectModel<typeof emailVerificationTokenTable>
