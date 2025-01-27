import z from 'zod'

export const postsPaginationSchema = z.object({
  page: z.coerce.number({ message: 'page query must be a number' }).optional(),
  limit: z.coerce.number({ message: 'limit query must be a number' }).optional()
})

export type PostsPaginationValues = z.infer<typeof postsPaginationSchema>
