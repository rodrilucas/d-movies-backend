import { MoviseService } from '@/services/movies-service'
import { MoviseController } from '../controllers/movies-controller'
import { KnexMoviesRepository } from '@/repositories/knex/knex-movies-repository'

export function makeMoviesController() {
  const moviesRepository = new KnexMoviesRepository()
  const moviesService = new MoviseService(moviesRepository)
  const moviesController = new MoviseController(moviesService)
  return moviesController
}
