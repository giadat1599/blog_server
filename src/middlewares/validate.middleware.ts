import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { ZodError, ZodSchema } from 'zod'

import { BAD_REQUEST } from '@/constants/http-status'

const validate = (schema: ZodSchema): RequestHandler => {
  return async (req, _, next): Promise<void> => {
    try {
      await schema.parseAsync(req)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(createHttpError(BAD_REQUEST, error.message))
      } else {
        next(error)
      }
    }
  }
}

export default validate
