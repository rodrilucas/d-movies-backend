import { KnexMoviesRepository } from '@/repositories/knex/knex-movies-repository'
import { MoviesService } from '../movies-service'

export function makeMoviesService() {
  const moviesRepository = new KnexMoviesRepository()
  const moviesService = new MoviesService(moviesRepository)
  return moviesService
}
