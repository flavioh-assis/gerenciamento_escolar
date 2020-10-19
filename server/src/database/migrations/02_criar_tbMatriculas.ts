import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbMatriculas', table => {
    table.increments('id').primary()
    table.string('ra').notNullable()
    table.date('data_inicio').notNullable()
    table.date('data_fim').nullable()
    table.string('ano_letivo').notNullable()
    table.string('classe').nullable()
    table.string('status').nullable()
    table.string('num_chamada').nullable()
    table.integer('idade').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbMatriculas')
}
