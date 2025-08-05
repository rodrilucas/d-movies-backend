import {
  FindByEmailParam,
  FindByIdParam,
  UsersRepository,
} from '@/repositories/contracts/users-repository'
import { ResourceNotFoundError } from '@/web/errors/resource-not-found-error'

type GetByIdParam = FindByIdParam
type GetByEmailParam = FindByEmailParam
type GetUserProfile = {
  id: string
}

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getById = async ({ id }: GetByIdParam) => {
    return await this.usersRepository.findById({ id })
  }

  getByEmail = async ({ email }: GetByEmailParam) => {
    return await this.usersRepository.findByEmail({ email })
  }

  getUserProfile = async ({ id }: GetUserProfile) => {
    const user = await this.getById({ id })

    if (!user) {
      throw new ResourceNotFoundError('Usuário não encontrado')
    }

    return user
  }
}
