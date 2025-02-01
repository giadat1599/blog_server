import { relations } from 'drizzle-orm'
import { InferSelectModel } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { postTable } from './post'

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url'),
  password: text('password').notNull(),
  googleId: text('google_id'),
  createdAt: timestamp('created_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true
  })
    .defaultNow()
    .notNull()
})

export const userRelation = relations(userTable, ({ many }) => ({
  posts: many(postTable, { relationName: 'author' })
}))

export type User = Omit<InferSelectModel<typeof userTable>, 'password' | 'googleId'>
