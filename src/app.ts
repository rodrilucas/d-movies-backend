import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { moviesRoutes } from './web/routes/movies/movies-routes'
import { errorHandler } from './errors/error-handler'
import { usersRoutes } from './web/routes/users/users-routes'
import { authRoutes } from './web/routes/auth/auth-routes'
import { fastifyJwtOptions } from './config/fastify-jwt-options'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, { origin: 'https://d-movies-frontend.vercel.app' })
app.register(fastifyJwt, fastifyJwtOptions)
app.register(authRoutes, { prefix: '/auth' })
app.register(moviesRoutes, { prefix: '/movies' })
app.register(usersRoutes, { prefix: '/users' })

app.setErrorHandler(errorHandler)
