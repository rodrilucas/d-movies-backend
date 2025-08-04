import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('movies', (table) => {
    table.integer('id').primary()
    table.string('title')
    table.text('overview')
    table.date('release_date').nullable()
    table.string('poster_path')
    table.float('vote_average')
    table.boolean('adult').defaultTo(false)
    table.string('backdrop_path')
    table.specificType('genre_ids', 'integer[]')
    table.string('original_language')
    table.string('original_title')
    table.float('popularity')
    table.boolean('video').defaultTo(false)
    table.integer('vote_count')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('movies')
}
