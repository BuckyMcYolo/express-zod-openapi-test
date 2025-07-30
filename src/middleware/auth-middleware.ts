import { z } from 'zod/v4'
import createHttpError from 'http-errors'
import { Middleware } from 'express-zod-api'
import { User } from '../db/schema'

export const authMiddleware = new Middleware({
  security: {
    // this information is optional and used for generating documentation
    and: [
      { type: 'input', name: 'key' },
      { type: 'header', name: 'token' },
    ],
  },
  input: z.object({
    key: z.string().min(1),
  }),
  handler: async ({ input: { key }, request, logger }) => {
    logger.debug('Checking the key and token')
    // const user = await authService.getUser(key)
    // const org = await db.query.orgsTable.findFirst({
    //   where: eq(orgsTable.id, user.orgId),
    // })
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      token: '1234567890',
      age: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User // just putting this here as an example
    const org = {
      id: 1,
      name: 'Org 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (!user) throw createHttpError(401, 'Invalid key')
    // if (request.headers.token !== user.token) {
    //   throw createHttpError(401, 'Invalid token')
    // }

    return { user, org } // provides endpoints with options.user and options.org
  },
})
