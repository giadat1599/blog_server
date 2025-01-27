import z from 'zod'

export const postsPaginationSchema = z.object({
  page: z.coerce
    .number({ message: 'page query must be a number' })
    .optional()
    .default(1)
    .transform((page) => Number(page)),
  limit: z.coerce
    .number({ message: 'limit query must be a number' })
    .optional()
    .default(5)
    .transform((limit) => Number(limit))
})

export type PostsPaginationValues = Partial<z.infer<typeof postsPaginationSchema>>
