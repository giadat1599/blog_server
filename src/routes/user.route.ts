import express from 'express'
import passport from 'passport'

import * as userHandlers from '@/handlers/user.handler'
import validate from '@/middlewares/validate.middleware'
import { requestEmailVerificationCodeSchema } from '@/validations/email_verification_code.validation'
import { loginSchema } from '@/validations/login.validation'
import { signupSchema } from '@/validations/signup.validation'

const router = express.Router()

router.post(
  '/request-verification-code',
  validate(requestEmailVerificationCodeSchema),
  userHandlers.requestEmailVerificationCode
)

router.post('/signup', validate(signupSchema), userHandlers.signup)
router.post('/login', validate(loginSchema), passport.authenticate('local'), userHandlers.login)

export default router
