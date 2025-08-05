import z from 'zod'

export const authenticateDto = z.object({
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(6, "A senha não pode ser menor que '6' caracteres")
    .max(100, "A senha pode ter no máximo '100' caracteres"),
})
