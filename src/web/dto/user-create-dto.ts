import z from 'zod'

export const userCreateDto = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(6, "A senha não pode ser menor que '6' caracteres")
    .max(100, "A senha pode ter no máximo '100' caracteres"),
})
