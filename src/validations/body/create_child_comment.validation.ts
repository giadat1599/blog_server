import { z } from 'zod'

export const createChildCommentSchema = z.object({
  postId: z.coerce.number({ message: 'postId must be a number' }),
  body: z.string({ message: 'body is required' })
})

export type CreateChildCommentValues = z.infer<typeof createChildCommentSchema>
