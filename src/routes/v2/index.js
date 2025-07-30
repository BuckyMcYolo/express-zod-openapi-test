import { usersRouting } from './users'
import { todosRouting } from './todos'

export const v2Routes = {
  ...usersRouting,
  ...todosRouting,
}
