import { MoviesService } from '@/services/movies-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllDto } from '../dto/get-all-dto'
import { parseSortParam } from '@/utils/parse-sort-param'
import { getByIdDto } from '../dto/get-by-id-dto'
import { searchDto } from '../dto/search-dto'
import { MoviesPageService } from '@/services/movies-page-service'
import { makeTmdbService } from '@/services/factories/make-tmdb-service'

export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesPageService: MoviesPageService,
  ) {}

  getAll = async (req: FastifyRequest, rep: FastifyReply) => {
    const { page, limit, sort } = getAllDto.parse(req.query)

    const { sortBy, sortOrder } = parseSortParam(sort)

    const movies = this.moviesService.getAll({
      page,
      limit,
      sortBy,
      sortOrder,
    })

    return rep.status(200).send({ movies })
  }

  getById = async (req: FastifyRequest, rep: FastifyReply) => {
    const { id } = getByIdDto.parse(req.params)
    const movie = await this.moviesService.getById({ id })
    rep.status(200).send({ movie })
  }

  search = async (req: FastifyRequest, rep: FastifyReply) => {
    const { query, page, limit, sort } = searchDto.parse(req.query)
    const { sortBy, sortOrder } = parseSortParam(sort)

    const pageData = await this.moviesPageService.getPage({
      page,
      query,
    })

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
        totalPages: pageData.total_pages,
        totalResults: pageData.total_results,
        limit,
        movies,
      })
    }

    const tmdbService = makeTmdbService()
    const resultsFromApi = await tmdbService.getPage({
      query,
      page,
      limit,
      sortBy,
      sortOrder,
    })

    return rep.status(200).send({
      page,
      ...resultsFromApi,
    })
  }
}
