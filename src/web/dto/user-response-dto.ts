import { z } from 'zod'

export const UserResponseDto = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
})

export type UserResponse = z.infer<typeof UserResponseDto>
