import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { usersTable } from '../../../db/schema'

export const getUsersHandler = async (id) => {
  let [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))

  if (!user) {
    throw new Error('User not found')
  }

  user = {
    ...user,
    someNewField: 'someNewValue',
  }

  return { user }
}

export const createUsersHandler = async (input) => {
  let [user] = await db.insert(usersTable).values(input).returning()

  if (!user) {
    throw new Error('Failed to create user')
  }

  user = {
    ...user,
    someNewField: 'someNewValue',
  }

  return {
    user,
    message: 'User created successfully',
  }
}
