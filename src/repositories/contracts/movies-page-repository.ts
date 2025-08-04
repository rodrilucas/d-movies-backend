import type { MoviesPage } from '@/@types'

export type SaveManyParam = {
  moviesPage: MoviesPage
}

export type SaveParam = {
  moviesPage: Omit<MoviesPage, 'id'>
}

export type FindByQueryParams = {
  query: string
  page: number
}

export interface MoviesPageRepository {
  save({ moviesPage }: SaveParam): Promise<void>
  saveMany({ moviesPage }: SaveManyParam): Promise<void>
  findByQuery({ query, page }: FindByQueryParams): Promise<MoviesPage | null>
}
