import { z } from 'zod'

export const getAllDto = z.object({
  page: z.coerce
    .number()
    .min(1, "A página não pode ser menor que '1'")
    .default(1),
  limit: z.coerce
    .number()
    .min(1, "O limite não pode ser menor que '1'")
    .max(50, "O limite não pode ser maior que '50'")
    .default(20),
  sort: z.coerce
    .string()
    .refine(
      (val) => {
        if (!val) return true
        const [field, direction] = val.split('.')
        return field && ['asc', 'desc'].includes(direction)
      },
      {
        message:
          "Formato inválido para o sort_by. Valor esperado 'field.asc' ou 'field.desc'",
      },
    )
    .optional(),
})
