import type {
  GetAllParams,
  GetByIdParam,
  SaveAllParam,
  SaveParam,
  GetByIdsParams,
  GetByFiltersParam,
  GetByKeywordParams,
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
  countMany(): Promise<Count[]>
  findById({ id }: GetByIdParam): Promise<Movie | null>
  findByIds({
    movieIds,
    sortBy,
    sortOrder,
  }: GetByIdsParams): Promise<Movie[] | null>
  findByKeyword({ keyword, limit }: GetByKeywordParams): Promise<Movie[]>
  findAdvance({ filters }: GetByFiltersParam): Promise<Movie[] | []>
  save({ movie }: SaveParam): Promise<void>
  saveMany({ movies }: SaveAllParam): Promise<void>
}
