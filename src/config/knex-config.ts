import type { Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: 'postgres',
  connection: env.DATABASE_URL,
  migrations: {
    extension: 'ts',
    directory: '.src/db/migrations',
  },
}
