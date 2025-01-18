import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

import { NOT_FOUND } from '@/constants/http-status'

const notFoundHandler: RequestHandler = (req, res, next) => {
  next(createHttpError(NOT_FOUND, 'Endpoint not found'))
}

export default notFoundHandler
