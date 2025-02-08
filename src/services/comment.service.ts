import { eq, getTableColumns } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { commentTable, userTable } from '@/db/schemas'
import { CreateChildCommentValues } from '@/validations/body/create_child_comment.validation'
import { CreatePostCommentValues } from '@/validations/body/create_post_comment.validation'

export const createNewPostComment = async (data: CreatePostCommentValues, postId: number, authorId: number) => {
  const comment = await dbClient
    .insert(commentTable)
    .values({
      authorId,
      postId,
      ...data
    })
    .returning()

  return comment
}

export const getChildComments = async (parentId: number) => {
  const comments = await dbClient
    .select({
      ...getTableColumns(commentTable),
      author: { id: userTable.id, username: userTable.username, displayName: userTable.displayName, avatarUrl: userTable.avatarUrl }
    })
    .from(commentTable)
    .innerJoin(userTable, eq(commentTable.authorId, userTable.id))
    .where(eq(commentTable.parentCommentId, parentId))

  return comments
}

export const createNewChildComment = async (data: CreateChildCommentValues, parentId: number, authorId: number) => {
  const comment = await dbClient
    .insert(commentTable)
    .values({
      ...data,
      parentCommentId: parentId,
      authorId
    })
    .returning()

  return comment
}
