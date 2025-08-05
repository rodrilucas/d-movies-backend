import { makeUsersController } from '@/web/factories/make-users-controller'
import { verifyJWT } from '@/web/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export function usersRoutes(app: FastifyInstance) {
  const usersController = makeUsersController()
  app.get('/profile', { onRequest: verifyJWT }, usersController.getProfile)
}
