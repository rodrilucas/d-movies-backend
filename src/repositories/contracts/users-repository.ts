import { User } from '@/@types'

export type SaveParam = {
  user: Omit<User, 'id'>
}

export type FindByEmailParam = {
  email: string
}

export type FindByIdParam = {
  id: string
}

export interface UsersRepository {
  save({ user }: SaveParam): Promise<void>
  findByEmail({ email }: FindByEmailParam): Promise<User | null>
  findById({ id }: FindByIdParam): Promise<User | null>
}
