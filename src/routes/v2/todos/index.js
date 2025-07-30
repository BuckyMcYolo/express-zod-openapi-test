import {
  getTodosEndpoint,
  getTodoByIdEndpoint,
  createTodoEndpoint,
  updateTodoEndpoint,
  deleteTodoEndpoint,
} from './routes'

export const todosRouting = {
  todos: {
    get: getTodosEndpoint,
    post: createTodoEndpoint,
  },
  todo: {
    ':id': {
      get: getTodoByIdEndpoint,
      put: updateTodoEndpoint,
      delete: deleteTodoEndpoint,
    },
  },
}