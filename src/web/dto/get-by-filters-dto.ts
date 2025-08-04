import z from 'zod'

export function dateBR(field = 'data') {
  return z
    .string()
    .refine((val) => val === '' || /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
      message: `O parâmetro ${field} deve estar no formato dd/mm/aaaa.`,
    })
    .refine(
      (val) => {
        if (val === '') return true
        const [day, month, year] = val.split('/').map(Number)
        const date = new Date(`${year}-${month}-${day}`)
        const currentYear = new Date().getFullYear()

        return (
          date instanceof Date &&
          !isNaN(date.getTime()) &&
          date.getDate() === day &&
          date.getMonth() + 1 === month &&
          date.getFullYear() === year &&
          year >= 1880 &&
          year <= currentYear
        )
      },
      {
        message: `O parâmetro ${field} deve ser uma data válida entre 1880 e o ano atual.`,
      },
    )
    .transform((val) => {
      if (val === '') return null
      const [day, month, year] = val.split('/').map(Number)
      const date = new Date(`${year}-${month}-${day}`)
      return date.toISOString().split('T')[0]
    })
}

export const getByFiltersDto = z.object({
  startYear: dateBR().optional(),
  endYear: dateBR().optional(),
  language: z.string().optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
  avaliation: z.coerce
    .number()
    .int()
    .min(0, "O número mínimo de avaliações não pode ser menor que '0'")
    .max(5000, "O número máximo de avaliações não pode ser maior que '5.000'")
    .optional(),
  includeAdult: z
    .boolean({ message: 'Conteúdo adulto só poder ser true ou false' })
    .optional(),
  keyword: z
    .string()
    .trim()
    .max(255, " O número máximo de caracteres é '255'")
    .optional(),
  genres: z
    .array(z.coerce.number().int().min(1, 'ID de genêro inválido'))
    .optional(),
  page: z.coerce
    .number()
    .min(1, "A página não pode ser menor que '1'")
    .default(1),
  limit: z.coerce
    .number()
    .min(1, "O limite não pode ser menor que '1'")
    .max(50, "O limite não pode ser maior que '50'")
    .default(20),
  sort: z
    .string()
    .refine(
      (val) => {
        if (!val) return true
        const [field, direction] = val.split('.')
        return field && ['asc', 'desc'].includes(direction)
      },
      {
        message:
          "Formato inválido para o sort. Valor esperado 'field.asc' ou 'field.desc'",
      },
    )
    .optional(),
})
