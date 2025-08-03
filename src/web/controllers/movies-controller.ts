import { MoviseService } from '@/services/movies-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllDto } from '../dto/get-all-dto'
import { parseSortParam } from '@/utils/parse-sort-param'

export class MoviseController {
  constructor(private readonly moviesService: MoviseService) {}

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
}
