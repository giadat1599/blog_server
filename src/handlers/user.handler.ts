import { RequestHandler } from 'express'

import dbClient from '@/db/db-client'

export const getUser: RequestHandler = async (req, res) => {
  const result = await dbClient.execute('select 1')
  res.json({
    result: result.rows
  })
}
