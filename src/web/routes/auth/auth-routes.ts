import { makeAuthController } from '@/web/factories/make-auth-controller'
import { FastifyInstance } from 'fastify'

export function authRoutes(app: FastifyInstance) {
  const authController = makeAuthController()
  app.post('/register', authController.register)
  app.post('/session', authController.authenticate)
}
