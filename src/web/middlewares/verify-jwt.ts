import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (e) {
    const error = e as Error
    return reply.status(401).send({ message: error.message })
  }
}
