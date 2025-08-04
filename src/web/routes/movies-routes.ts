import { FastifyInstance } from 'fastify'
import { makeMoviesController } from '../factories/make-movies-controller'

export function moviesRoutes(app: FastifyInstance) {
  const moviesControler = makeMoviesController()
  app.get('/', moviesControler.getAll)
  app.get('/:id', moviesControler.getById)
  app.get('/search', moviesControler.search)
}
