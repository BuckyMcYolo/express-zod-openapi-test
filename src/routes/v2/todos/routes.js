import { defaultEndpointsFactory } from 'express-zod-api'
import { z } from 'zod/v4'
import { db } from '../../../db'
import { insertTodoSchema, selectTodoSchema } from '../../../db/schema'
import {
  createTodosHandler,
  getTodosHandler,
  updateTodosHandler,
  deleteTodosHandler,
} from './handlers'
import { authMiddleware } from '../../../middleware/auth-middleware'
import { publicMiddleware } from '../../../middleware/public-middleware'

const router = defaultEndpointsFactory.addMiddleware(publicMiddleware)

export const getTodosEndpoint = router.build({
  method: 'get',
  input: z.object({
    limit: z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).optional().default(0),
  }),
  output: z.object({
    todos: z.array(selectTodoSchema),
    count: z.number(),
  }),
  handler: async ({ input: { limit, offset }, options }) => {
    console.log(options.ip)

    const todos = await db.query.todosTable.findMany({
      limit,
      offset,
    })

    return {
      todos,
      count: todos.length,
    }
  },
})

// Get todo by ID endpoint
export const getTodoByIdEndpoint = router.build({
  method: 'get',
  input: z.object({
    id: z.coerce.number().int().positive(),
  }),
  output: z.object({
    todo: selectTodoSchema,
  }),
  handler: async ({ input: { id } }) => {
    return getTodosHandler(id)
  },
})

// Create todo endpoint
export const createTodoEndpoint = router.build({
  method: 'post',
  input: insertTodoSchema,
  output: z.object({
    todo: selectTodoSchema,
    message: z.string(),
  }),
  handler: async ({ input }) => {
    return createTodosHandler(input)
  },
})

// Update todo endpoint
export const updateTodoEndpoint = router.build({
  method: 'put',
  input: z.object({
    id: z.coerce.number().int().positive(),
    ...insertTodoSchema.shape,
  }),
  output: z.object({
    todo: selectTodoSchema,
    message: z.string(),
  }),
  handler: async ({ input: { id, ...updateData } }) => {
    return updateTodosHandler(id, updateData)
  },
})

// Delete todo endpoint
export const deleteTodoEndpoint = router.build({
  method: 'delete',
  input: z.object({
    id: z.coerce.number().int().positive(),
  }),
  output: z.object({
    message: z.string(),
  }),
  handler: async ({ input: { id } }) => {
    return deleteTodosHandler(id)
  },
})
