import crypto from 'crypto'

import { and, eq } from 'drizzle-orm'
import createHttpError from 'http-errors'

import dbClient from '@/db/db-client'
import { EmailVerificationToken, emailVerificationTokenTable, userTable } from '@/db/schemas'

export const getEmailVerificationToken = async (
  email: string,
  code: string
): Promise<EmailVerificationToken | undefined> => {
  const [emailVerificationToken] = await dbClient
    .select()
    .from(emailVerificationTokenTable)
    .where(and(eq(emailVerificationTokenTable.email, email), eq(emailVerificationTokenTable.code, code)))
    .limit(1)

  return emailVerificationToken
}

export const createEmailVerificationToken = async (email: string): Promise<EmailVerificationToken> => {
  const code = crypto.randomInt(100000, 999999).toString()

  const [existingEmail] = await dbClient.select().from(userTable).where(eq(userTable.email, email)).limit(1)

  if (existingEmail) {
    throw createHttpError(409, 'A user with this email address already exists')
  }

  const [emailVerificationToken] = await dbClient
    .insert(emailVerificationTokenTable)
    .values({
      email,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    })
    .returning()

  return emailVerificationToken
}
