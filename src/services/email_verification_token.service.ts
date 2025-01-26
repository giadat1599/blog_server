import crypto from 'crypto'

import { and, eq } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { EmailVerificationToken, emailVerificationTokenTable } from '@/db/schemas'

export const getEmailVerificationToken = async (email: string, code: string): Promise<EmailVerificationToken | undefined> => {
  const [emailVerificationToken] = await dbClient
    .select()
    .from(emailVerificationTokenTable)
    .where(and(eq(emailVerificationTokenTable.email, email), eq(emailVerificationTokenTable.code, code)))
    .limit(1)

  return emailVerificationToken
}

export const createEmailVerificationToken = async (email: string): Promise<EmailVerificationToken> => {
  const code = crypto.randomInt(100000, 999999).toString()

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

export const deleteEmailVerificationTokenById = async (id: number): Promise<void> => {
  await dbClient.delete(emailVerificationTokenTable).where(eq(emailVerificationTokenTable.id, id))
}
