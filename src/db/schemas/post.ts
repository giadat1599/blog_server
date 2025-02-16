import { relations } from 'drizzle-orm'
import { serial, pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'

import { commentTable } from './comment'
import { userTable } from './user'

export const postTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  summary: text('summary').notNull(),
  body: text('body').notNull(),
  featuredImageUrl: text('featured_image_url').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => userTable.id),
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

export const postRelation = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
    relationName: 'authorPosts'
  }),
  comments: many(commentTable, {
    relationName: 'postComments'
  })
}))
