import { KnexUsersRepository } from '@/repositories/knex/knex-users-repository'
import { UsersService } from '../users-service'

export function makeUsersService() {
  const usersRepository = new KnexUsersRepository()
  const moviesService = new UsersService(usersRepository)
  return moviesService
}
