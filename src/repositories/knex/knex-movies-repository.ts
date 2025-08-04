import { Movie } from '@/@types'
import { Count, MoviesRepository } from '../contracts/movies-repository'
import {
  GetAllParams,
  GetByIdParam,
  SaveAllParam,
  SaveParam,
  GetByIdsParams,
} from '@/services/movies-service'
import { db } from '@/lib/knex'

export class KnexMoviesRepository implements MoviesRepository {
  async save({ movie }: SaveParam): Promise<void> {
    await db('movies').insert(movie)
  }

  async saveMany({ movies }: SaveAllParam): Promise<void> {
    await db('movies').insert(movies).onConflict('id').merge()
  }

  async findMany({
    page,
    limit,
    sortBy,
    sortOrder,
  }: GetAllParams): Promise<Movie[] | null> {
    const offset = (page - 1) * limit
    const query = db('movies').limit(limit).offset(offset)

    if (sortBy && sortOrder) {
      query.whereNotNull(sortBy).orderBy(sortBy, sortOrder)
    }

    return await query
  }

  async countAll(): Promise<Count[]> {
    return await db('movies').count()
  }

  async findById({ id }: GetByIdParam): Promise<Movie | null> {
    const movie = await db('movies').where('id', id).first()
    return movie ?? null
  }

  async findByIds({
    movieIds,
    sortBy,
    sortOrder,
  }: GetByIdsParams): Promise<Movie[] | null> {
    const query = db('movies').whereIn('id', movieIds)

    if (sortBy && sortOrder) {
      query.orderBy(sortBy, sortOrder)
    }

    return await query
  }
}
