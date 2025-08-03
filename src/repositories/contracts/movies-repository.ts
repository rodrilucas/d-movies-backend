import type { GetAllParams, GetByIdParam } from '@/services/movies-service'
import { Movie } from '@/@types'

export type Count = {
  count: number
}

export interface MoviesRepository {
  findAll({
    page,
    limit,
    sortBy,
    sortOrder,
  }: GetAllParams): Promise<Movie[] | null>
  countAll(): Promise<Count[]>
  findById({ id }: GetByIdParam): Promise<Movie | null>
}
