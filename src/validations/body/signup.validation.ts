import { z } from 'zod'

export const signupSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z0-9_]*$/),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(/^(?!.* )/),
  verificationCode: z.string().min(1)
})

export type SignUpValues = z.infer<typeof signupSchema>
