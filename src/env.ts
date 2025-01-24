import 'dotenv/config'

import { z, ZodError } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().url(),
  BLOG_CLIENT_URL: z.string().url(),
  SESSION_SECRET: z.string()
})

type Env = z.infer<typeof envSchema>

let env: Env

try {
  env = envSchema.parse(process.env)
} catch (err) {
  const error = err as ZodError
  console.error('Invalid env: ')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
