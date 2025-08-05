// eslint-disable-next-line
import { Knex } from 'knex'
import type { Movie, MoviesPage, User } from './index'

declare module 'knex/types/tables' {
  interface Tables {
    movies: Movie
    movies_page: MoviesPage
    users: User
  }
}
