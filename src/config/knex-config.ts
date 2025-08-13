import type { Knex } from 'knex'

export const config: Knex.Config = {
  client: 'postgres',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  },
}
