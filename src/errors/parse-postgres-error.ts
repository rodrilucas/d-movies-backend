import { FastifyError } from 'fastify'

type PgErrorMessages = {
  status: number
  message: string
}

export function parsePostgresError(err: FastifyError) {
  if (!err || !err.code) return null

  const map: Record<string, PgErrorMessages> = {
    '23505': { status: 409, message: 'Registro duplicado' },
    '23503': { status: 409, message: 'Violação de chave estrangeira' },
    '23502': { status: 400, message: 'Campo obrigatório não informado' },
    '42703': { status: 400, message: 'Coluna não existe' },
    '42P01': { status: 400, message: 'Tabela não existe' },
    '22P02': { status: 400, message: 'Formato de dado inválido' },
    '42601': { status: 400, message: 'Erro de sintaxe na consulta' },
  }

  return map[err.code] || null
}
