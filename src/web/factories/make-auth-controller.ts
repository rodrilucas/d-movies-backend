import { makeAuthService } from '@/services/factories/make-auth-service'
import { AuthController } from '../controllers/auth/auth-controller'

export function makeAuthController() {
  const authService = makeAuthService()
  const authController = new AuthController(authService)
  return authController
}
