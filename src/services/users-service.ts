import {
  FindByEmailParam,
  FindByIdParam,
  SaveParam,
  UsersRepository,
} from '@/repositories/contracts/users-repository'
import { AlreadyExistsError } from '@/web/errors/already-exists-error'

type RegisterParam = SaveParam
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

  getById = async ({ id }: GetByIdParam) => {
    return await this.usersRepository.findById({ id })
  }

  getByEmail = async ({ email }: GetByEmailParam) => {
    return await this.usersRepository.findByEmail({ email })
  }
}
