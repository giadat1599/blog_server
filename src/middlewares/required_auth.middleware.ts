import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

import { UNAUTHORIZED } from '@/constants/http-status'

const requiredAuth: RequestHandler = (req, res, next) => {
  try {
    if (!req.user?.id) throw createHttpError(UNAUTHORIZED, 'Unauthorized')
    next()
  } catch (error) {
    next(error)
  }
}

export default requiredAuth
