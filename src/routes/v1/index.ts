import { Routing } from 'express-zod-api'
import { usersRouting } from './users'

export const v1Routes: Routing = {
  ...usersRouting,
}
