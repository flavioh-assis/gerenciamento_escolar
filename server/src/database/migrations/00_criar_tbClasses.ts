import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbClasses', table => {
    table.increments('id').primary()
    table.string('ano').notNullable()
    table.string('turma').notNullable()
    table.string('periodo').notNullable()
    table.string('sala').notNullable()
    table.string('professor').nullable()
    table.string('situaçao').notNullable()
    table.string('ano_letivo').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbClasses')
}
