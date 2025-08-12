import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { env } from '@/env'
import z, { ZodError } from 'zod'
import { parsePostgresError } from './parse-postgres-error'

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

  const pgErr = parsePostgresError(error)

  if (pgErr) {
    return rep.status(pgErr.status).send({ message: pgErr.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return rep.status(500).send({ message: 'Internal server error' })
}
