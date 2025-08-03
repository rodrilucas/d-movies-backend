import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@/env'
import z, { ZodError } from 'zod'

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  rep: FastifyReply,
) {
  if (error instanceof ZodError) {
    const flat = z.flattenError(error)
    return rep.status(400).send({
      message: 'Erros de validação',
      errors: flat.fieldErrors,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //
  }
  return rep.status(500).send({ message: 'Internal server error' })
}
