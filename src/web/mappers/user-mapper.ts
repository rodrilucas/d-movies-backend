import { User } from '@/@types'
import { UserResponse } from '../dto/user-response-dto'

type ToUserDto = {
  user: User
}

export class UserMapper {
  static toUserDto = ({ user }: ToUserDto): UserResponse => ({
    id: user.id.toString(),
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  })
}
