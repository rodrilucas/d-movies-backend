import fastify from 'fastify'
import { moviesRoutes } from './web/routes/movies/movies-routes'
import { errorHandler } from './errors/error-handler'
import { usersRoutes } from './web/routes/users/users-routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.register(moviesRoutes, { prefix: '/movies' })
app.register(usersRoutes, { prefix: '/users' })

app.setErrorHandler(errorHandler)
