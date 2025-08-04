import { Movie } from '@/@types'
import { Count, MoviesRepository } from '../contracts/movies-repository'
import {
  GetAllParams,
  GetByIdParam,
  SaveAllParam,
  SaveParam,
  GetByIdsParams,
  SortBy,
  GetByFiltersParam,
  GetByKeywordParams,
} from '@/services/movies-service'
import { db } from '@/lib/knex'

type Field = SortBy | 'original_language' | 'adult'

type Operator = '=' | '>=' | '<='

type Value = string | number | boolean

type Condition = [Field, Operator, Value]

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

  async findByKeyword({
    keyword,
    limit,
  }: GetByKeywordParams): Promise<Movie[]> {
    return await db('movies')
      .whereILike('title', `%${keyword}%`)
      .orWhereILike('original_title', `%${keyword}%`)
      .limit(limit)
  }

  async findAdvance({ filters }: GetByFiltersParam): Promise<Movie[] | []> {
    const query = db('movies')

    const conditions: Condition[] = []

    if (filters.startYear) {
      conditions.push(['release_date', '>=', filters.startYear])
    }
    if (filters.endYear) {
      conditions.push(['release_date', '<=', filters.endYear])
    }
    if (filters.language) {
      conditions.push(['original_language', '=', filters.language])
    }
    if (filters.rating) {
      conditions.push(['vote_average', '>=', filters.rating])
    }
    if (filters.avaliation) {
      conditions.push(['vote_count', '>=', filters.avaliation])
    }
    if (filters.includeAdult === false) {
      conditions.push(['adult', '=', false])
    }

    for (const [field, op, value] of conditions) {
      query.where(field, op, value)
    }

    if (filters.keyword) {
      query.where((qb) => {
        qb.where('title', 'ilike', `%${filters.keyword}%`).orWhere(
          'original_title',
          'ilike',
          `%${filters.keyword}%`,
        )
      })
    }

    if (filters.genres && filters.genres.length) {
      query.whereRaw(`genre_ids && ARRAY[${filters.genres.join(',')}]::int[]`)
    }

    if (filters.sort && filters.sort.by && filters.sort.order) {
      query
        .whereNotNull(filters.sort.by)
        .orderBy(filters.sort.by, filters.sort.order)
    }

    const offset = (filters.page - 1) * filters.limit
    query.limit(filters.limit).offset(offset)

    return await query
  }
}
