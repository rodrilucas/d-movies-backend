import { MoviesService } from '@/services/movies-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllDto } from '../../dto/get-all-dto'
import { parseSortParam } from '@/utils/parse-sort-param'
import { getByIdDto } from '../../dto/get-by-id-dto'
import { searchDto } from '../../dto/search-dto'
import { MoviesPageService } from '@/services/movies-page-service'
import { makeTmdbService } from '@/services/factories/make-tmdb-service'
import { getByFiltersDto } from '../../dto/get-by-filters-dto'
import { getByKeywordDto } from '../../dto/get-by-keyword.dto'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesPageService: MoviesPageService,
  ) {}

  getAll = async (req: FastifyRequest, rep: FastifyReply) => {
    const { page, limit, sort } = getAllDto.parse(req.query)
    const { sortBy, sortOrder } = parseSortParam(sort)

    const movies = await this.moviesService.getAll({
      page,
      limit,
      sortBy,
      sortOrder,
    })

    const [{ count }] = await this.moviesService.countAll()

    return rep.status(200).send({
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      totalResults: Number(count),
      movies,
    })
  }

  getById = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id } = getByIdDto.parse(req.params)
    try {
      const movie = await this.moviesService.getById({ id })
      rep.status(200).send({ movie })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        rep.status(404).send({ error: error.message })
      }
      throw error
    }
  }

  search = async (req: FastifyRequest, rep: FastifyReply) => {
    const { query, page, limit, sort } = searchDto.parse(req.query)
    const { sortBy, sortOrder } = parseSortParam(sort)

    const tmdbService = makeTmdbService()

    const pageData = await this.moviesPageService.getPage({
      page,
      query,
    })

    try {
      if (pageData) {
        const movies = await this.moviesService.getByIds({
          page,
          limit,
          movieIds: pageData.movie_ids,
          sortBy,
          sortOrder,
        })
        return rep.status(200).send({
          page,
          limit,
          totalPages: pageData.total_pages,
          totalResults: pageData.total_results,
          movies,
        })
      }

      const moviesFromAPI = await tmdbService.getPage({
        query,
        page,
        limit,
        sortBy,
        sortOrder,
      })

      return rep.status(200).send({
        page,
        limit,
        totalPages: moviesFromAPI.total_pages,
        totalResults: moviesFromAPI.total_results,
        movies: moviesFromAPI.results,
      })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        rep.status(404).send({ error: error.message })
      }
      throw error
    }
  }

  getByFilters = async (req: FastifyRequest, rep: FastifyReply) => {
    const filters = getByFiltersDto.parse(req.body)
    const { sortBy, sortOrder } = parseSortParam(filters.sort)

    console.log(filters)

    const [{ count }] = await this.moviesService.countAll()

    const movies = await this.moviesService.getByFilters({
      filters: {
        ...filters,
        sort: { by: sortBy, order: sortOrder },
      },
    })

    return rep.status(200).send({
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(count / filters.limit),
      totalResults: count,
      movies,
    })
  }

  getByKeyword = async (req: FastifyRequest, rep: FastifyReply) => {
    const { keyword, limit } = getByKeywordDto.parse(req.query)

    const movies = await this.moviesService.getByKeyword({
      keyword,
      limit,
    })

    rep.status(200).send({
      limit,
      movies,
    })
  }
}
