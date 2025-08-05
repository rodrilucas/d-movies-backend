import { makeUsersController } from '@/web/factories/make-users-controller'
import { FastifyInstance } from 'fastify'

export function usersRoutes(app: FastifyInstance) {
  const usersController = makeUsersController()
  app.post('/', usersController.register)
}
