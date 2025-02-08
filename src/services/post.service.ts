import { and, count, eq, getTableColumns, isNull } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { postTable, userTable, commentTable } from '@/db/schemas'
import { OffetPagination } from '@/utils/get_offset_pagination'

export const getPosts = async (pagination: Pick<OffetPagination, 'limit' | 'skip'>) => {
  const { limit, skip } = pagination

  const posts = await dbClient
    .select({
      ...getTableColumns(postTable),
      author: { id: userTable.id, username: userTable.username, displayName: userTable.displayName, avatarUrl: userTable.avatarUrl }
    })
    .from(postTable)
    .innerJoin(userTable, eq(postTable.authorId, userTable.id))
    .offset(skip)
    .limit(limit)

  return posts
}

export const getPostsCount = async () => {
  const [result] = await dbClient.select({ count: count() }).from(postTable)
  return result.count
}

export const getPostBySlug = async (slug: string) => {
  const post = await dbClient.query.postTable.findFirst({
    where: eq(postTable.slug, slug),
    with: {
      author: {
        columns: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true
        }
      }
    }
  })
  return post
}

export const getAllSlugs = async () => {
  const slugs = await dbClient.query.postTable.findMany({
    columns: { slug: true }
  })
  return slugs
}

export const getPostComments = async (postId: number) => {
  const postComments = await dbClient
    .select({
      ...getTableColumns(commentTable),
      author: { id: userTable.id, username: userTable.username, displayName: userTable.displayName, avatarUrl: userTable.avatarUrl }
    })
    .from(commentTable)
    .innerJoin(userTable, eq(commentTable.authorId, userTable.id))
    .where(and(eq(commentTable.postId, postId), isNull(commentTable.parentCommentId)))

  return postComments
}

export const getPostCommentsCount = async (postId: number) => {
  const [result] = await dbClient.select({ count: count() }).from(commentTable).where(eq(commentTable.postId, postId))
  return result.count
}
