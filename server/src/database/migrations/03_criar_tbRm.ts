import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbRm', table => {
    table.increments('rm').primary()
    table.string('aluno').notNullable()
    table.string('data_nasc').nullable()
    table.string('mae').nullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbRm')
}
