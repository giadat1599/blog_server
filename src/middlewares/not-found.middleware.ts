import { NOT_FOUND } from '@/constants/http-status'
import { RequestHandler } from 'express'

import createHttpError from 'http-errors'

const notFoundHandler: RequestHandler = (req, res, next) => {
  next(createHttpError(NOT_FOUND, 'Endpoint not found'))
}

export default notFoundHandler
