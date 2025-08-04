import { KnexMoviesPageRepository } from '../knex/knex-movies-page-repository'

export function makeKnexMoviesPageRepository() {
  const moviesPageRepository = new KnexMoviesPageRepository()
  return moviesPageRepository
}
