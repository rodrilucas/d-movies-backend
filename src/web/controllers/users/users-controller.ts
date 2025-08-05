import { UsersService } from '@/services/users-service'
import { registerDto } from '@/web/dto/register-dto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { AlreadyExistsError } from '@/web/errors/already-exists-error'

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  register = async (req: FastifyRequest, rep: FastifyReply) => {
    const { firstName, lastName, email, password } = registerDto.parse(req.body)

    const hashedPassword = await hash(password, 6)

    try {
      await this.usersService.register({
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password_hash: hashedPassword,
        },
      })

      return rep.status(201).send()
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        return rep.status(409).send({ error: error.message })
      }
      throw error
    }
  }
}
