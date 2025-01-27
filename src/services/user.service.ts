import { eq } from 'drizzle-orm'

import dbClient from '@/db/db-client'
import { User, userTable } from '@/db/schemas'
import { SignUpValues } from '@/validations/body/signup.validation'

export const getUserByEmail = async (email: string): Promise<User> => {
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
    .where(eq(userTable.email, email))
    .limit(1)

  return user
}

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

export const getUserById = async (id: number): Promise<User> => {
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
    .where(eq(userTable.id, id))
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
