import { db } from '@/lib/knex'
import type {
  SaveParam,
  SaveManyParam,
  MoviesPageRepository,
} from '../contracts/movies-page-repository'
import { MoviesPage } from '@/@types'
import { GetPageParams } from '@/services/movies-page-service'

export class KnexMoviesPageRepository implements MoviesPageRepository {
  async save({ moviesPage }: SaveParam): Promise<void> {
    await db('movies_page').insert(moviesPage)
  }

  async saveMany({ moviesPage }: SaveManyParam): Promise<void> {
    await db('movies_page').insert(moviesPage).onConflict('id').merge()
  }

  async findByQuery({
    query,
    page,
  }: GetPageParams): Promise<MoviesPage | null> {
    const movies = await db('movies_page')
      .where('normalized_query', query)
      .andWhere('page_number', page)
      .first()
    return movies ?? null
  }
}
