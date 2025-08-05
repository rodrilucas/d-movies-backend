import { KnexUsersRepository } from '@/repositories/knex/knex-users-repository'
import { AuthService } from '../auth-service'

export function makeAuthService() {
  const usersRepository = new KnexUsersRepository()
  const authService = new AuthService(usersRepository)
  return authService
}
