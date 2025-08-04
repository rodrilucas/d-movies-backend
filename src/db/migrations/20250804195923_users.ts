import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').nullable()
    table.string('email').notNullable().unique()
    table.string('password_hash').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users')
}
