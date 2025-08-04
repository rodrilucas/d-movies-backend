import { z } from 'zod'

export const getByKeywordDto = z.object({
  keyword: z.string().trim().max(255, "O número máximo de caracteres é '255'"),
  limit: z.coerce
    .number()
    .min(1, "O limite não pode ser menor que '1'")
    .max(50, "O limite não pode ser maior que '50'")
    .default(20),
})
