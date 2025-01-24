import argon2 from 'argon2'
import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

import { BAD_REQUEST, CONFLICT, CREATED, OK } from '@/constants/http-status'
import asyncHandler from '@/middlewares/async_handler.middleware'
import {
  createEmailVerificationToken,
  deleteEmailVerificationTokenById,
  getEmailVerificationToken
} from '@/services/email_verification_token.service'
import { createUser, getUserByEmail, getUserById, getUserByUsername } from '@/services/user.service'
import { RequestEmailVerificationCode } from '@/validations/email_verification_code.validation'
import { SignUpValues } from '@/validations/signup.validation'

export const requestEmailVerificationCode: RequestHandler = asyncHandler(async (req, res) => {
  const { email } = req.body as RequestEmailVerificationCode

  const existingEmail = await getUserByEmail(email)

  if (existingEmail) {
    throw createHttpError(CONFLICT, 'A user with this email address already exists')
  }

  await createEmailVerificationToken(email)

  // TODO: send verification code to user's email
  res.sendStatus(CREATED)
})

export const signup: RequestHandler = asyncHandler(async (req, res) => {
  const { username, password, email, verificationCode } = req.body as SignUpValues
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

  req.logIn(newUser, (error) => {
    if (error) throw error
    res.status(CREATED).json(newUser)
  })
})

export const login: RequestHandler = asyncHandler((req, res) => {
  // Authentication is handled by Passport
  res.status(OK).json(req.user)
})

export const logout: RequestHandler = asyncHandler((req, res) => {
  req.logOut((error) => {
    if (error) throw error
    res.sendStatus(OK)
  })
})

export const currentUser: RequestHandler = asyncHandler(async (req, res) => {
  const currentUser = await getUserById(req.user!.id!)
  res.status(OK).json(currentUser)
})
