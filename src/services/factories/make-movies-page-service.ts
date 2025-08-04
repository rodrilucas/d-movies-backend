import { KnexMoviesPageRepository } from '@/repositories/knex/knex-movies-page-repository'
import { MoviesPageService } from '../movies-page-service'

export function makeMoviesPageService() {
  const moviesPageRepository = new KnexMoviesPageRepository()
  const moviesService = new MoviesPageService(moviesPageRepository)
  return moviesService
}
