import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type LoginValues = z.infer<typeof loginSchema>
