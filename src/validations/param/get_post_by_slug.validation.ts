import { z } from 'zod'

export const getPostBySlugSchema = z.object({
  slug: z.string()
})

export type GetPostBySlugValues = z.infer<typeof getPostBySlugSchema>
