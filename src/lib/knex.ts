import knex from 'knex'
import { config } from '../config/knex-config'

export const db = knex(config)
