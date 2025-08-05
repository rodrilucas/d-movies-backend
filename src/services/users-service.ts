import {
  FindByEmailParam,
  FindByIdParam,
  SaveParam,
  UsersRepository,
} from '@/repositories/contracts/users-repository'
import { AlreadyExistsError } from '@/web/errors/already-exists-error'
import { InvalidCredentials } from '@/web/errors/invalid-credentials'
import { compare } from 'bcryptjs'

type RegisterParam = SaveParam
type AuthenticateParam = {
  email: string
  password: string
}
type GetByIdParam = FindByIdParam
type GetByEmailParam = FindByEmailParam

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  register = async ({ user }: RegisterParam) => {
    const userExists = await this.usersRepository.findByEmail({
      email: user.email,
    })

    if (userExists) {
      throw new AlreadyExistsError('Email já cadastrado')
    }

    await this.usersRepository.save({ user })
  }

  authenticate = async ({ email, password }: AuthenticateParam) => {
    const user = await this.usersRepository.findByEmail({ email })

    if (!user) {
      throw new InvalidCredentials()
    }

    const passwordMatches = await compare(password, user.password_hash)

    if (!passwordMatches) {
      throw new InvalidCredentials()
    }

    return user
  }

  getById = async ({ id }: GetByIdParam) => {
    return await this.usersRepository.findById({ id })
  }

  getByEmail = async ({ email }: GetByEmailParam) => {
    return await this.usersRepository.findByEmail({ email })
  }
}
