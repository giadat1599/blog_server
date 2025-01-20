import argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import createHttpError from 'http-errors'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { UNAUTHORIZED } from '@/constants/http-status'
import dbClient from '@/db/db-client'
import { userTable } from '@/db/schemas'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId: number, done) => {
  done(null, { id: userId })
})

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const [user] = await dbClient.select().from(userTable).where(eq(userTable.username, username)).limit(1)
      if (!user) {
        throw createHttpError(UNAUTHORIZED, 'Username or passport incorrect')
      }

      const isPasswordMatch = await argon2.verify(user.password, password)

      if (!isPasswordMatch) {
        throw createHttpError(UNAUTHORIZED, 'Username or passport incorrect')
      }

      done(null, {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
    } catch (error) {
      done(error)
    }
  })
)
