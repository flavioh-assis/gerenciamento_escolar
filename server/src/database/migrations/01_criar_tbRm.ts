import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbRm', table => {
    table.increments('id').primary()
    table.string('aluno')
    table.string('nasc_data')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbRm')
}
