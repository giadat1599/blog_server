import { INTERNAL_SERVER_ERROR } from '@/constants/http-status'
import { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = INTERNAL_SERVER_ERROR
  let errorMessage = 'An unknow error occurred'
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
}

export default errorHandler
