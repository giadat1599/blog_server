import argon2 from 'argon2'
import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

import { BAD_REQUEST, CREATED, OK } from '@/constants/http-status'
import {
  createEmailVerificationToken,
  deleteEmailVerificationTokenById,
  getEmailVerificationToken
} from '@/services/email_verification_token.service'
import { createUser, getUserByUsername } from '@/services/user.service'
import { RequestEmailVerificationCode } from '@/validations/email_verification_code.validation'
import { SignUpValues } from '@/validations/signup.validation'

export const requestEmailVerificationCode: RequestHandler = async (req, res, next) => {
  const { email } = req.body as RequestEmailVerificationCode
  try {
    const emailVerificationToken = await createEmailVerificationToken(email)

    // TODO: send verification code to user's email

    res.status(CREATED).json(emailVerificationToken)
  } catch (error) {
    next(error)
  }
}

export const signup: RequestHandler = async (req, res, next) => {
  const { username, password, email, verificationCode } = req.body as SignUpValues
  try {
    const exisitingUser = await getUserByUsername(username)

    if (exisitingUser) {
      throw createHttpError(BAD_REQUEST, 'User already taken')
    }

    const emailVerificationToken = await getEmailVerificationToken(email, verificationCode)

    if (!emailVerificationToken || emailVerificationToken.expiresAt.getTime() <= Date.now()) {
      throw createHttpError(BAD_REQUEST, 'Verification code incorrect or expired')
    }

    await deleteEmailVerificationTokenById(emailVerificationToken.id)

    const hashedPassword = await argon2.hash(password)

    const newUser = await createUser({ username, password: hashedPassword, email })

    // TODO: set session/cookie

    // TODO: create util types for response
    res.status(CREATED).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const login: RequestHandler = (req, res) => {
  // Authentication is handled by Passport
  res.status(OK).json(req.user)
}
