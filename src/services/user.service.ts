import { eq } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { User, userTable } from '@/db/schemas'
import { SignUpValues } from '@/validations/signup.validation'

export const getUserByUsername = async (username: string): Promise<User> => {
  const [user] = await dbClient
    .select({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email,
      displayName: userTable.displayName,
      avatarUrl: userTable.avatarUrl,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt
    })
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1)

  return user
}

export const createUser = async (data: Omit<SignUpValues, 'verificationCode'>): Promise<User> => {
  const { username, password, email } = data
  const [newUser] = await dbClient
    .insert(userTable)
    .values({
      username,
      displayName: username,
      email,
      password
    })
    .returning({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email,
      displayName: userTable.displayName,
      avatarUrl: userTable.avatarUrl,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt
    })

  return newUser
}
