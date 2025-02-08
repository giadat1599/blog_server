import { z } from 'zod'

export const createPostCommentSchema = z.object({
  body: z.string({ message: 'body is required' })
})

export type CreatePostCommentValues = z.infer<typeof createPostCommentSchema>
