import fastify from 'fastify'
import { moviesRoutes } from './web/routes/movies/movies-routes'
import { errorHandler } from './errors/error-handler'
import { usersRoutes } from './web/routes/users/users-routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { authRoutes } from './web/routes/auth/auth-routes'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET, sign: { expiresIn: '1d' } })
app.register(authRoutes, { prefix: '/auth' })
app.register(moviesRoutes, { prefix: '/movies' })
app.register(usersRoutes, { prefix: '/users' })

app.setErrorHandler(errorHandler)
