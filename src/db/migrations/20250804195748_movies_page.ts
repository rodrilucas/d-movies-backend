import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('movies_page', (table) => {
    table.increments('id').primary()
    table.string('query')
    table.string('normalized_query')
    table.integer('page_number')
    table.specificType('movie_ids', 'integer[]')
    table.integer('total_pages')
    table.integer('total_results')
    table.unique(['normalized_query', 'page_number'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('movies_page')
}
