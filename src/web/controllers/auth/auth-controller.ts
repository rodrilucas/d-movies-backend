import { AuthService } from '@/services/auth-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { userCreateDto } from '@/web/dto/user-create-dto'
import { authenticateDto } from '@/web/dto/authenticate-dto'
import { AlreadyExistsError } from '@/web/errors/already-exists-error'
import { InvalidCredentials } from '@/web/errors/invalid-credentials'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: FastifyRequest, rep: FastifyReply) => {
    const { firstName, lastName, email, password } = userCreateDto.parse(
      req.body,
    )

    const hashedPassword = await hash(password, 6)

    try {
      await this.authService.register({
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

  authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
    const { email, password } = authenticateDto.parse(req.body)

    try {
      const user = await this.authService.authenticate({ email, password })
      const token = await rep.jwtSign(
        {},
        {
          sign: {
            sub: user.id.toString(),
          },
        },
      )
      return rep.status(200).send({ token })
    } catch (error) {
      if (error instanceof InvalidCredentials) {
        rep.status(401).send({ error: error.message })
      }
      throw error
    }
  }
}
