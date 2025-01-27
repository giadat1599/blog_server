import { z } from 'zod'

export const requestEmailVerificationCodeSchema = z.object({
  email: z.string().email()
})

export type RequestEmailVerificationCode = z.infer<typeof requestEmailVerificationCodeSchema>
