import type { FastifyJWTOptions } from '@fastify/jwt'
import { env } from '@/env'

export const fastifyJwtOptions: FastifyJWTOptions = {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
  messages: {
    badRequestErrorMessage: 'Requisição mal formada.',
    noAuthorizationInHeaderMessage: 'Token não enviado no header.',
    noAuthorizationInCookieMessage: 'Token não encontrado no cookie.',
    authorizationTokenExpiredMessage: 'Token expirado.',
    authorizationTokenInvalid: 'Token inválido.',
    authorizationTokenUnsigned: 'Token não assinado.',
    authorizationTokenUntrusted: 'Token não confiável.',
  },
}
