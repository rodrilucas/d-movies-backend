import { UsersService } from '@/services/users-service'
import { UserResponseDto } from '@/web/dto/user-response-dto'
import { ResourceNotFoundError } from '@/web/errors/resource-not-found-error'
import { UserMapper } from '@/web/mappers/user-mapper'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getProfile = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      const user = await this.usersService.getUserProfile({ id: req.user.sub })
      const dto = UserMapper.toUserDto({ user })
      const safeUserOutput = UserResponseDto.parse(dto)
      rep.status(200).send(safeUserOutput)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        rep.status(404).send({ error: error.message })
      }
      throw error
    }
  }
}
