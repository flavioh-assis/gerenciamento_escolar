import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('tbMatriculas', table => {
    table.increments('id').primary()
    table.string('ra').notNullable()
    table.string('data_inicio').notNullable()
    table.string('data_fim').nullable()
    table.string('ano_letivo').notNullable()
    table.integer('classe_id').notNullable()
    table.enum('situaçao', ['ATIVO', 'TRAN', 'REMA', 'CONC']).nullable()
    table.string('movimentaçoes').nullable()
    table.integer('num_chamada').notNullable()
    table.integer('idade').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tbMatriculas')
}
