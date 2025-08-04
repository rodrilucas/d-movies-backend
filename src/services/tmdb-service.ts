import type { Movie } from '@/@types'
import { env } from '@/env'
import { ApiRequestError } from '@/web/errors/api-request-error'
import { ResourceNotFoundError } from '@/web/errors/resource-not-found-error'
import { makeMoviesService } from './factories/make-movies-service'
import { SortBy, SortOrder } from './movies-service'
import { makeMoviesPageService } from './factories/make-movies-page-service'

type GetPageParams = {
  query: string
  page: number
  limit: number
  sortBy?: SortBy
  sortOrder?: SortOrder
}

export class TmdbService {
  private readonly TMDB_API_BASE_URL: string
  private readonly TMDB_TOKEN: string

  constructor() {
    this.TMDB_API_BASE_URL = env.TMDB_URL
    this.TMDB_TOKEN = env.TMDB_TOKEN
  }

  fetchFromTMDB = async (endpoint: string, options = {}) => {
    const url = `${this.TMDB_API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.TMDB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiRequestError()
    }
    return data
  }

  async getPage({ query, limit, sortBy, sortOrder, page = 1 }: GetPageParams) {
    const moviesService = makeMoviesService()

    const moviesFromAPI = await this.fetchFromTMDB(
      `/search/movie?query=${encodeURIComponent(
        query,
      )}&language=pt-BR&page=${page}&limit=${limit}&sort_by=${sortBy}.${sortOrder}`,
    )

    if (moviesFromAPI.results.length === 0) {
      throw new ResourceNotFoundError(
        'Não foram encontrados filmes na API do TMDB',
      )
    }

    await moviesService.saveAll({ movies: moviesFromAPI.results })

    const movieIds = moviesFromAPI.results.map((movie: Movie) => movie.id)

    const moviesPageService = makeMoviesPageService()

    await moviesPageService.save({
      page,
      query,
      movieIds,
      totalPages: moviesFromAPI.total_pages,
      totalResults: moviesFromAPI.totalResults,
    })

    return moviesFromAPI
  }
}
