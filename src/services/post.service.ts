import dbClient from '@/db/db-client'

export const getPosts = async () => {
  const posts = await dbClient.query.postTable.findMany()
  return posts
}
