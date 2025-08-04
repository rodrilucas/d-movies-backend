import type { MoviesPage } from '@/@types'
import { MoviesPageRepository } from '@/repositories/contracts/movies-page-repository'
import { normalizeQuery } from '@/utils/normalized-query'

export type SaveAllParam = {
  moviesPage: MoviesPage[]
}

export type SaveParam = {
  moviesPage: MoviesPage
}

export type SavePageParams = {
  query: string
  page: number
  totalPages: number
  totalResults: number
  movieIds: number[]
}

export type GetPageParams = {
  query: string
  page: number
}

export class MoviesPageService {
  constructor(private readonly moviesPageRepository: MoviesPageRepository) {}

  async save({
    query,
    page,
    totalPages,
    totalResults,
    movieIds,
  }: SavePageParams) {
    const normalized = normalizeQuery(query)

    const existing = await this.moviesPageRepository.findByQuery({
      query: normalized,
      page,
    })

    if (existing) return existing

    await this.moviesPageRepository.save({
      moviesPage: {
        query,
        normalized_query: normalized,
        page_number: page,
        total_pages: totalPages,
        total_results: totalResults,
        movie_ids: movieIds,
      },
    })

    return await this.moviesPageRepository.findByQuery({
      query: normalized,
      page,
    })
  }

  async getPage({ query, page = 1 }: GetPageParams) {
    const normalized = normalizeQuery(query)
    const pageData = await this.moviesPageRepository.findByQuery({
      query: normalized,
      page,
    })

    return pageData
  }
}
