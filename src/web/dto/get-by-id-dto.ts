import { z } from 'zod'

export const getByIdDto = z.object({
  id: z.coerce.string({ message: "O 'id' do filme é inválido" }),
})
