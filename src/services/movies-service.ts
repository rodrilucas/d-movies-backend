import { Movie } from '@/@types'
import { MoviesRepository } from '@/repositories/contracts/movies-repository'
import { ResourceNotFoundError } from '@/web/errors/resource-not-found-error'

export type SaveParam = {
  movie: Movie
}

export type SaveAllParam = {
  movies: Movie[]
}

export type SortBy =
  | 'release_date'
  | 'vote_average'
  | 'vote_count'
  | 'popularity'

export type SortOrder = 'asc' | 'desc'

export type GetAllParams = {
  page: number
  limit: number
  sortBy?: SortBy
  sortOrder?: SortOrder
}

export type GetByIdParam = {
  id: string
}

export type GetByIdsParams = {
  page: number
  limit: number
  movieIds: number[]
  sortBy?: string
  sortOrder?: SortOrder
}

export type SortOptions = {
  by?: SortBy
  order?: SortOrder
}

type MovieFilters = {
  startYear?: string | null
  endYear?: string | null
  language?: string
  rating?: number
  avaliation?: number
  includeAdult?: boolean
  keyword?: string
  genres?: number[]
  sort?: SortOptions
  page: number
  limit: number
}

export type GetByFiltersParam = {
  filters: MovieFilters
}

export type GetByKeywordParams = {
  keyword: string
  limit: number
}

export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  getAll = async ({ page, limit, sortBy, sortOrder }: GetAllParams) => {
    const movies = await this.moviesRepository.findMany({
      page,
      limit,
      sortBy,
      sortOrder,
    })

    return movies
  }

  getById = async ({ id }: GetByIdParam) => {
    const movie = await this.moviesRepository.findById({ id })
    if (!movie) {
      throw new ResourceNotFoundError('Filme não encontrado')
    }
    return movie
  }

  async getByIds({ movieIds, page, limit, sortBy, sortOrder }: GetByIdsParams) {
    const movies = await this.moviesRepository.findByIds({
      movieIds,
      page,
      limit,
      sortBy,
      sortOrder,
    })
    if (!movies) {
      throw new ResourceNotFoundError(
        'Não foram encontrados filmes através dos ids',
      )
    }
    return movies
  }

  save = async ({ movie }: SaveParam) => {
    await this.moviesRepository.save({ movie })
  }

  saveAll = async ({ movies }: SaveAllParam) => {
    const sanitizedMovies = movies.map((movie) => ({
      ...movie,
      release_date: movie.release_date?.trim() || null,
    }))

    await this.moviesRepository.saveMany({ movies: sanitizedMovies })
  }

  countAll = async () => {
    return await this.moviesRepository.countMany()
  }

  async getByFilters({ filters }: GetByFiltersParam) {
    const movies = await this.moviesRepository.findAdvance({ filters })
    return movies
  }

  async getByKeyword({ keyword, limit }: GetByKeywordParams) {
    const movies = await this.moviesRepository.findByKeyword({ keyword, limit })
    return movies
  }
}
