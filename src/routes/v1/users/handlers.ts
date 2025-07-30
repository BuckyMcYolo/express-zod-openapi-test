import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { usersTable, selectUserSchema, User, NewUser } from '../../../db/schema'

export const getUsersHandler = async (id: User['id']) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))

  if (!user) {
    throw new Error('User not found')
  }

  return { user }
}

export const createUsersHandler = async (input: NewUser) => {
  const [user] = await db.insert(usersTable).values(input).returning()

  if (!user) {
    throw new Error('Failed to create user')
  }

  return {
    user,
    message: 'User created successfully',
  }
}

export const updateUsersHandler = async (
  id: User['id'],
  data: Partial<NewUser>,
) => {
  const [user] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning()

  if (!user) {
    throw new Error('User not found')
  }

  return {
    user,
    message: 'User updated successfully',
  }
}

export const deleteUsersHandler = async (id: User['id']) => {
  const [deletedUser] = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning()

  if (!deletedUser) {
    throw new Error('User not found')
  }

  return {
    message: 'User deleted successfully',
  }
}
