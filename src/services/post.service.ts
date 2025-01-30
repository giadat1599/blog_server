import { count, eq } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { postTable, userTable } from '@/db/schemas'
import { OffetPagination } from '@/utils/get_offset_pagination'

export const getPosts = async (pagination: Pick<OffetPagination, 'limit' | 'skip'>) => {
  const { limit, skip } = pagination

  const posts = await dbClient
    .select({
      author: { id: userTable.id, username: userTable.username, displayName: userTable.displayName, avatarUrl: userTable.avatarUrl },
      post: postTable
    })
    .from(postTable)
    .innerJoin(userTable, eq(postTable.authorId, userTable.id))
    .offset(skip)
    .limit(limit)

  return posts.map((post) => ({ ...post.post, author: post.author }))
}

export const getPostsCount = async () => {
  const [result] = await dbClient.select({ count: count() }).from(postTable)
  return result.count
}
