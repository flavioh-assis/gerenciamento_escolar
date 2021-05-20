import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbClasses', table => {
    table.increments('id').primary()
    table.string('ano')
    table.string('turma')
    table.string('periodo')
    table.string('sala')
    table.string('professor')
    table.integer('n_ativos')
    table.integer('n_total')
    table.string('ano_letivo')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbClasses')
}
