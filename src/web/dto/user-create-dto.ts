import z from 'zod'

export const userCreateDto = z.object({
  firstName: z
    .string({ error: 'O primeiro nome é obrigatório' })
    .min(1, 'O primeiro nome não pode estar vazio'),
  lastName: z
    .string({ error: 'O sobrenome é obrigatório' })
    .min(1, 'O sobrenome não pode estar vazio'),
  email: z.email('Email inválido'),
  password: z
    .string({ error: 'A senha é obrigatória' })
    .min(6, "A senha não pode ser menor que '6' caracteres")
    .max(100, "A senha pode ter no máximo '100' caracteres"),
})
