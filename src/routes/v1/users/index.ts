import { Routing } from 'express-zod-api'
import {
  getUsersEndpoint,
  getUserByIdEndpoint,
  createUserEndpoint,
  updateUserEndpoint,
  deleteUserEndpoint,
} from './routes'

export const usersRouting: Routing = {
  users: {
    get: getUsersEndpoint,
    post: createUserEndpoint,
  },
  user: {
    ':id': {
      get: getUserByIdEndpoint,
      patch: updateUserEndpoint,
      delete: deleteUserEndpoint,
    },
  },
}
