import { MoviesRepository } from '@/repositories/contracts/movies-repository'

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

export class MoviseService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  getAll = async ({ page, limit, sortBy, sortOrder }: GetAllParams) => {
    const movies = await this.moviesRepository.findAll({
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
}
