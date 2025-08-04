import type {
  GetAllParams,
  GetByIdParam,
  SaveAllParam,
  SaveParam,
  GetByIdsParams,
  GetByFiltersParams,
} from '@/services/movies-service'
import { Movie } from '@/@types'

export type Count = {
  count: number
}

export interface MoviesRepository {
  findMany({
    page,
    limit,
    sortBy,
    sortOrder,
  }: GetAllParams): Promise<Movie[] | null>
  countAll(): Promise<Count[]>
  findById({ id }: GetByIdParam): Promise<Movie | null>
  findByIds({
    movieIds,
    sortBy,
    sortOrder,
  }: GetByIdsParams): Promise<Movie[] | null>
  findAdvance({ filters }: GetByFiltersParams): Promise<Movie[] | []>
  save({ movie }: SaveParam): Promise<void>
  saveMany({ movies }: SaveAllParam): Promise<void>
}
