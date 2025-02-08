import { z } from 'zod'

export const getCommentsByParentIdSchema = z.object({
  commentId: z.coerce.number({ message: 'commentId must be a number' })
})

export type GetCommentsByParentIdValues = z.infer<typeof getCommentsByParentIdSchema>
