import express from 'express'

import * as userHandlers from '@/handlers/user.handler'
import validate from '@/middlewares/validate.middleware'
import { requestEmailVerificationCodeSchema } from '@/validations/email_verification_code.validation'
import { signupSchema } from '@/validations/signup.validation'

const router = express.Router()

router.post(
  '/request-verification-code',
  validate(requestEmailVerificationCodeSchema),
  userHandlers.requestEmailVerificationCode
)

router.post('/signup', validate(signupSchema), userHandlers.signup)

export default router
