import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { ZodError, ZodSchema } from 'zod'

import { BAD_REQUEST } from '@/constants/http-status'

const validate = (schema: ZodSchema, which: 'body' | 'params' | 'query' = 'body'): RequestHandler => {
  return async (req, _, next): Promise<void> => {
    try {
      const values = await schema.parseAsync(req[which])
      req[which] = { ...req[which], ...values }
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(createHttpError(BAD_REQUEST, { message: error.flatten().fieldErrors }))
      } else {
        next(error)
      }
    }
  }
}

export default validate
