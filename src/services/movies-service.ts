import { Movie } from '@/@types'
import { MoviesRepository } from '@/repositories/contracts/movies-repository'

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

export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  getAll = async ({ page, limit, sortBy, sortOrder }: GetAllParams) => {
    const movies = await this.moviesRepository.findMany({
      page,
      limit,
      sortBy,
      sortOrder,
    })

    const [{ count }] = await this.moviesRepository.countAll()

    return {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalMovies: movies?.length,
      movies,
    }
  }

  getById = async ({ id }: GetByIdParam) => {
    const movie = this.moviesRepository.findById({ id })
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
    return movies
  }

  save = async ({ movie }: SaveParam) => {
    await this.moviesRepository.save({ movie })
  }

  saveAll = async ({ movies }: SaveAllParam) => {
    console.log(movies)
    const sanitizedMovies = movies.map((movie) => ({
      ...movie,
      release_date: movie.release_date?.trim() || null,
    }))

    await this.moviesRepository.saveMany({ movies: sanitizedMovies })
  }
}
