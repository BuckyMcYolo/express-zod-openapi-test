import {
  getUsersEndpoint,
  getUserByIdEndpoint,
  createUserEndpoint,
} from './routes'

export const usersRouting = {
  users: {
    get: getUsersEndpoint,
    post: createUserEndpoint,
  },
  user: {
    ':id': {
      get: getUserByIdEndpoint,
    },
  },
}
