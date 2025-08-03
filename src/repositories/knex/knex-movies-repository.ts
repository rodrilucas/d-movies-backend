import { Movie } from '@/@types'
import { Count, MoviesRepository } from '../contracts/movies-repository'
import { GetAllParams, GetByIdParam } from '@/services/movies-service'
import { db } from '@/lib/knex'

export class KnexMoviesRepository implements MoviesRepository {
  async findAll({
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
}
