import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '@/db/schemas'
import env from '@/env'

const pool = new Pool({
  connectionString: env.DATABASE_URL
})

const dbClient = drizzle({ client: pool, schema })

export default dbClient
