import { defaultEndpointsFactory } from 'express-zod-api'
import { z } from 'zod/v4'
import { db } from '../../../db'
import { insertUserSchema, selectUserSchema } from '../../../db/schema'
import { createUsersHandler, getUsersHandler } from './handlers'
import { authMiddleware } from '../../../middleware/auth-middleware'

const router = defaultEndpointsFactory.addMiddleware(authMiddleware)

export const getUsersEndpoint = router.build({
  method: 'get',
  input: z.object({
    limit: z.coerce.number().min(1).max(100).optional().default(10),
    offset: z.coerce.number().min(0).optional().default(0),
  }),
  output: z.object({
    users: z.array(selectUserSchema),
    count: z.number(),
  }),
  handler: async ({ input: { limit, offset }, options }) => {
    // Using db.query for better intellisense

    console.log(options.user.id)

    const users = await db.query.usersTable.findMany({
      limit,
      offset,
    })

    users = users.map((user) => {
      return {
        ...user,
        someNewField: 'someNewValue',
      }
    })

    return {
      users,
      count: users.length,
    }
  },
})

// Get user by ID endpoint
export const getUserByIdEndpoint = router.build({
  method: 'get',
  input: z.object({
    id: z.coerce.number().int().positive(),
  }),
  output: z.object({
    user: selectUserSchema,
  }),
  handler: async ({ input: { id } }) => {
    return getUsersHandler(id)
  },
})

// Create user endpoint
export const createUserEndpoint = router.build({
  method: 'post',
  input: insertUserSchema,
  output: z.object({
    user: selectUserSchema,
    message: z.string(),
  }),
  handler: async ({ input }) => {
    return createUsersHandler(input)
  },
})
