import { makeUsersService } from '@/services/factories/make-users-service'
import { UsersController } from '../controllers/users/users-controller'

export function makeUsersController() {
  const usersService = makeUsersService()
  const usersController = new UsersController(usersService)
  return usersController
}
