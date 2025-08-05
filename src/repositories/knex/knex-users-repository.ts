import { User } from '@/@types'
import {
  FindByEmailParam,
  FindByIdParam,
  SaveParam,
  UsersRepository,
} from '../contracts/users-repository'
import { db } from '@/lib/knex'

export class KnexUsersRepository implements UsersRepository {
  async save({ user }: SaveParam): Promise<void> {
    await db('users').insert(user)
  }

  async findByEmail({ email }: FindByEmailParam): Promise<User | null> {
    const user = await db('users').where('email', email).first()
    return user ?? null
  }

  async findById({ id }: FindByIdParam): Promise<User | null> {
    const user = await db('users').where('id', id).first()
    return user ?? null
  }
}
