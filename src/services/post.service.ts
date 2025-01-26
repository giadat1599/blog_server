import { eq } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { postTable, userTable } from '@/db/schemas'

export const getPosts = async () => {
  const posts = await dbClient.select().from(postTable).innerJoin(userTable, eq(postTable.authorId, userTable.id))
  return posts
}
