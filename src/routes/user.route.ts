import express from 'express'

import * as userHandlers from '@/handlers/user.handler'
import validate from '@/middlewares/validate.middleware'
import { requestEmailVerificationCodeSchema } from '@/validations/email_verification_code.validation'

const router = express.Router()

router.post(
  '/request-verification-code',
  validate(requestEmailVerificationCodeSchema),
  userHandlers.requestEmailVerificationCode
)

export default router
