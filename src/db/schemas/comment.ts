import { relations } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/pg-core'
import { serial } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { AnyPgColumn } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'

import { postTable } from './post'
import { userTable } from './user'

export const commentTable = pgTable('comments', {
  id: serial().primaryKey(),
  body: text('body').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => userTable.id),
  postId: integer('post_id')
    .notNull()
    .references(() => postTable.id),
  parentCommentId: integer('parent_comment_id').references((): AnyPgColumn => commentTable.id),
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

export const commentRelation = relations(commentTable, ({ one, many }) => ({
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
    relationName: 'postComments'
  }),
  author: one(userTable, {
    fields: [commentTable.authorId],
    references: [userTable.id],
    relationName: 'authorComments'
  }),
  parentComment: one(commentTable, {
    fields: [commentTable.parentCommentId],
    references: [commentTable.id],
    relationName: 'childComments'
  }),
  childComments: many(commentTable, {
    relationName: 'childComments'
  })
}))
