import fastify from 'fastify'
import { moviesRoutes } from './web/routes/movies-routes'
import { errorHandler } from './errors/error-handler'

export const app = fastify()

app.register(moviesRoutes, { prefix: '/movies' })

app.setErrorHandler(errorHandler)
