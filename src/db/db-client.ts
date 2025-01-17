import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import env from '@/env'

const pool = new Pool({
  connectionString: env.DATABASE_URL
})

const dbClient = drizzle({ client: pool })

export default dbClient
