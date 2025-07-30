import { eq } from 'drizzle-orm'
import { db } from '../../../db'
import { todosTable } from '../../../db/schema'

export const getTodosHandler = async (id) => {
  const [todo] = await db.select().from(todosTable).where(eq(todosTable.id, id))

  if (!todo) {
    throw new Error('Todo not found')
  }

  return { todo }
}

export const createTodosHandler = async (input) => {
  const [todo] = await db.insert(todosTable).values(input).returning()

  if (!todo) {
    throw new Error('Failed to create todo')
  }

  return {
    todo,
    message: 'Todo created successfully',
  }
}

export const updateTodosHandler = async (id, input) => {
  const [todo] = await db.update(todosTable)
    .set(input)
    .where(eq(todosTable.id, id))
    .returning()

  if (!todo) {
    throw new Error('Todo not found')
  }

  return {
    todo,
    message: 'Todo updated successfully',
  }
}

export const deleteTodosHandler = async (id) => {
  const [todo] = await db.delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning()

  if (!todo) {
    throw new Error('Todo not found')
  }

  return {
    message: 'Todo deleted successfully',
  }
}