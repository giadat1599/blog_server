import { RequestHandler } from 'express'

import { createEmailVerificationToken } from '@/services/email_verification_token.service'
import { RequestEmailVerificationCode } from '@/validations/email_verification_code.validation'

export const requestEmailVerificationCode: RequestHandler = async (req, res, next) => {
  const { email } = req.body as RequestEmailVerificationCode
  try {
    const emailVerificationToken = await createEmailVerificationToken(email)

    // TODO: send verification code to user's email

    res.json(emailVerificationToken)
  } catch (error) {
    next(error)
  }
}
