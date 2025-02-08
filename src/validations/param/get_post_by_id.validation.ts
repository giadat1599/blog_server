import { z } from 'zod'

export const getPostByIdSchema = z.object({
  postId: z.coerce.number({ message: 'id must be a number' })
})

export type GetPostByIdValues = z.infer<typeof getPostByIdSchema>
